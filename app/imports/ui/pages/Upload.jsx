import React from 'react';
import { Grid } from 'semantic-ui-react';
import Papa from 'papaparse'
import { _ } from 'meteor/underscore'
import { Meteor } from "meteor/meteor";
import '../../api/building_db'


/** A simple static component to render some text for the landing page. */
class Upload extends React.Component {

  constructor(props) {



    super(props);
    this.csvParsed = {};
    this.keys = {};
    this.buildList = ["Date","AG_ENGINEERING_MAIN_MTR", "AG_ENGINEERING_MCC_MTR", "AG_SCIENCE_MCC_MTR", "ARCHTECTURE_MAIN_MTR", "BACHMAN_HALL_MAIN_MTR", "BIOMEDICAL_SCIENCE_CH_1_MTR", "BIOMEDICAL_SCIENCE_CH_2_MTR", "BIOMEDICAL_SCIENCE_MAIN_A_MTR", "BIOMEDICAL_SCIENCE_MAIN_B_MTR", "BIOMEDICAL_SCIENCE_MCC_A_MTR", "BUS_AD_SHIDLER_MAIN_MTR", "KOREAN_STUDIES_MAIN_MTR"]
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.readSingleFile = this.readSingleFile.bind(this);
    this.promptHeaders = this.promptHeaders.bind(this);

  }

  readSingleFile(e) {
    console.log(sample.find().fetch());
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var contents = e.target.result;
      var element = document.getElementById('file-content');
      element.textContent = contents;
      this.csvParsed = Papa.parse(contents, { header: true }).data;
      this.keys = _.keys(this.csvParsed);

    };
    reader.readAsText(file);
  }

  promptHeaders() {
    //This should prompt the user with this.keys to select the building and the date
  }

  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Row>
            <input type="file" id="file-input" onChange={this.readSingleFile}/>
          </Grid.Row>
          <Grid.Row>
            <pre id="file-content">{console.log(sample.find().fetch())}</pre>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Upload;