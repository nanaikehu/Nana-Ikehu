import fs from 'fs';
import Papa from 'papaparse';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';


Buildings = new Mongo.Collection('Buildings');


if (Meteor.isServer) {
  Buildings.rawCollection().drop();
// assets/app here is analagous to your /private directory in the root of your app. This is where Meteor ultimately
// stores the contents of /private in a built app.
  const text = fs.readFileSync('assets/app/files/BuildingList.csv', 'utf8');
  const buildings_raw = Papa.parse(text);

  buildings_raw.data.shift(); // remove header

  _.each(buildings_raw.data, item => {
    const array = _.values(item);
    const data_insert = {
      code: array[0],
      name: array[1],
      sqft: array[2],
      floors: array[3],
      rooms: array[4],
      meters: [],
      csvLabels: [],

    };
    Buildings.insert(data_insert);

  });

}
sample = new Mongo.Collection('sample');


if (Meteor.isServer) {
  sample.rawCollection().drop();
// assets/app here is analagous to your /private directory in the root of your app. This is where Meteor ultimately
// stores the contents of /private in a built app.
  const text = fs.readFileSync('assets/app/files/engmain.csv', 'utf8');
  const sample_raw = Papa.parse(text);

  sample_raw.data.shift(); // remove header

  _.each(sample_raw.data, item => {
    const array = _.values(item);
    const data_insert = {
      date: new Date(array[0]),
      kw: array[1],
    };
    sample.insert(data_insert);

  });

}

console.log(sample.find().fetch().length)


if (Meteor.isServer) {
  Meteor.publish('sample', function () {
    return sample.find();
  });
}

if (Meteor.isClient) {
  sub_sample = Meteor.subscribe('sample',function() {
    console.log(sample.find().count());
  });
}

export { Buildings, sample, sub_sample };
