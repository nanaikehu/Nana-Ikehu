import React from 'react';
import { Dropdown, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import {Graph_SimpleLine} from '../components/Graph_SimpleLine';

export class Building extends React.Component {

  constructor(props) {
    super(props)
    this.state = { data: '' };
    this.DropdownList = this.DropdownList.bind(this);
    this.onBuilding = this.onBuilding.bind(this)
    this.DropdownMeterList = this.DropdownMeterList.bind(this)
    this.meterSelected = this.meterSelected.bind(this)

  }

  componentWillMount() {
    const self = this;
    Meteor.call("getBuildings", (error, response) => {
      if (error) {
        console.log('Building' + error)
      } else {
        console.log("res+ build ")
        console.log(response)
        self.setState({ data: response });
      }
    });
  }

  DropdownList() {
    let builds = this.state.data;
    let selection = [];
    _.forEach(builds, build => {
      let x = {
        key: build.code,
        value: build.code,
        text: build.name
      }
      selection.push(x)
    })

    return selection;
  }

  DropdownMeterList() {
    if (this.state.build) {

      let selected = _.findWhere(this.state.data, { code: this.state.build });
      let selection = [];
      _.forEach(selected.meters, build => {
        let x = {
          key: build.id,
          value: build.id,
          text: build.unit + build.name
        }
        selection.push(x)
      })
      return (

          <Dropdown placeholder='Select Meter' fluid search selection options={selection} onChange={this.meterSelected}/>

      );
    }
  }


  meterSelected(e, name) {
    this.setState({ meter: name.value });
    console.log("meter ID: " + name.value)
  }

  render() {

    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  onBuilding(e, name) {
    this.setState({ build: name.value });
    console.log("build ID: " + name.value)
  }

  renderGraph() {

    return (<div>

        <Dropdown placeholder='Select Building' fluid search selection options={this.DropdownList()}
                  onChange={this.onBuilding}/>
          { (this.state.build) ? this.DropdownMeterList() : '' }

          { (this.state.meter) ? <Graph_SimpleLine meterId={this.state.meter} x={'time'} y={'mean'}/> : null}
        </div>
    );
  }

}

