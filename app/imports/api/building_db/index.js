import fs from 'fs'
import Papa from 'papaparse';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import zlib from 'zlib'

export const Buildings = new Mongo.Collection('Buildings');
export const kwData = new Mongo.Collection('kwData');

if (Meteor.isServer) {

  Buildings.remove({});
// assets/app here is analagous to your /private directory in the root of your app. This is where Meteor ultimately
// stores the contents of /private in a built app.
  let text = fs.readFileSync('assets/app/files/BuildingList.csv', 'utf8');
  let buildings_raw = Papa.parse(text);

  buildings_raw.data.shift(); // remove header
  let insertArray = [];
  _.each(buildings_raw.data, item => {
    const array = _.values(item);
    const data_insert = {
      code: array[0],
      name: array[1],
      sqft: parseInt(array[2]),
      floors: parseInt(array[3]),
      rooms: parseInt(array[4]),
      meters: [],
      csvLabels: [],

    };
    insertArray.push(data_insert)

  })
  Buildings.batchInsert(insertArray);

  let tags = fs.readFileSync('assets/app/files/TagIds.csv', 'utf8');

  let tagraw = Papa.parse(tags, { header: true, skipEmptyLines: true, trimHeaders: true }).data;

  let buildlist = _.pluck(Buildings.find().fetch(), 'name')

  tagraw = _.groupBy(tagraw, row => {
    let currentMeters = Buildings.find({
      name: row.BuildingName
    }, { fields: { _id: 0, meters: 1 } }).fetch()[0];
    if (buildlist.some((item) =>item == row.BuildingName) && currentMeters) {

      let meterAdd = {
        name: row.EntityName,
        unit: row.TagName.toUpperCase(),
        id: parseInt(row.TagLogId)
      };

      Buildings.update({ name: row.BuildingName }, { $push : {meters: meterAdd}})

    }
  }

  )
// Prune empty
  let empty = Buildings.find({meters : []}).fetch();
  empty.map(noMeter => Buildings.remove({ _id : noMeter._id }))



  Meteor.publish('building', function () {
    return Buildings.find({});
  })

  //kwData blank, re-initialize
  if (kwData.find().count() == 0) {
    let text = fs.readFileSync('assets/app/files/export.csv', 'utf8');

    let kwRaw = Papa.parse(text, { header: true, skipEmptyLines: true, trimHeaders: true });

    console.log("Initializing historical data")
    let insertArray = [];
    _.each(kwRaw.data, item => {
      const data_insert = {
        time: new Date(item.SampleTsUtc),
        meterId: parseInt(item.TagLogId),
        mean: parseFloat(item.Mean),
        min: parseFloat(item.Min),
        max: parseFloat(item.Max)
      };
      insertArray.push(data_insert)

      if (insertArray.length == 10000) {
        kwData.batchInsert(insertArray);
        insertArray.length = 0;
      }

    })
    kwData.batchInsert(insertArray)
    kwData._ensureIndex({ meterId: 1, time: 1 });
    kwData._ensureIndex({ time: 1, meterId: 1 });

  }

  Meteor.publish('kwData', function () {
    return kwData.find();
  })

  Meteor.methods({
        'getMeter': (id) => {
          console.log(id)
          return kwData.find({ meterId: id }, { fields: { _id: 0, meterId: 0 } }).fetch()
        },
        'getAllbyDate': (start, end) => {
          console.log(new Date(start).toISOString())
          return kwData.find({
            time: {
              $lte: new Date(end),
              $gte: new Date(start)
            }
          }).fetch()
        }
        ,
        'getMeterbyDate': (id, start, end) => {
          console.log(new Date(start).toISOString())
          return kwData.find({
            meterId: id,
            time: {
              $lte: new Date(end),
              $gte: new Date(start)
            }
          }, { fields: { _id: 0, meterId: 0 } }).fetch()
        },
        'getBuildings': () => {
          return Buildings.find().fetch();
        },

        'sumByDate': (start, end) => {
          let resp = {};
          let x = kwData.find({
            time: {
              $lte: new Date(end),
              $gte: new Date(start)
            }
          }).forEach(meterLog =>{

            if(resp[meterLog.meterId] == null){
              resp[meterLog.meterId] = {}
              resp[meterLog.meterId].mean = 0;
              resp[meterLog.meterId].max = 0;
            }
            resp[meterLog.meterId].max = Math.max(resp[meterLog.meterId].max,meterLog.max)
            resp[meterLog.meterId].mean += meterLog.mean

              }

          )
          console.log(resp)
          let buildings = {};
          _.each(resp, (object, key) => {
            Buildings.find({meters: {$elemMatch: {id: parseInt(key)}}}).forEach(entry => {

              if(buildings[entry.name] == null){
                buildings[entry.name] = [];
              }
              let meter =_.findWhere(entry.meters, {id: parseInt(key)});
              if(meter.name.includes("MAIN"))
              buildings[entry.name].push(object)

            })

          })
          console.log(buildings)
          return { meters: resp, buildings : buildings}

        }
      }
  )

}

export default { Buildings, kwData }
