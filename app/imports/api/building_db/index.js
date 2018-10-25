import fs from 'fs';
import Papa from 'papaparse';
import { _ } from 'meteor/underscore';


const Buildings = new Mongo.Collection('buildings');


if(Meteor.isServer) {
// assets/app here is analagous to your /private directory in the root of your app. This is where Meteor ultimately
// stores the contents of /private in a built app.
  const text = fs.readFileSync('assets/app/files/BuildingList.csv', 'utf8');
  const buildings_raw = Papa.parse(text);

  buildings_raw.data.shift(); //remove header

  _.each(buildings_raw.data, item => {
    let array = _.values(item);
    let data_insert = {
      code: array[0],
      name: array[1],
      sqft: array[2],
      floors: array[3],
      rooms: array[4],
      export_labels: []

    }
    Buildings.insert(data_insert);

  })

}

console.log(Buildings.find())