import React from 'react';
import { Dropdown, Loader, Card, Input, Grid, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Graph_SimpleLine } from '../components/Graph_SimpleLine';
import { Graph_LineBrush } from '../components/Graph_LineBrush';
import DatePicker from 'react-date-picker';
import MeterTextSum from '../components/MeterTextSum'

export class Building extends React.Component {

  constructor(props) {
    super(props)
    var today = new Date()
    var priorDate = new Date().setDate(today.getDate()-30)
    this.state = { data: '',  dateStart: new Date(priorDate),   dateEnd: today};
    this.DropdownList = this.DropdownList.bind(this);
    this.onBuilding = this.onBuilding.bind(this)
    this.DropdownMeterList = this.DropdownMeterList.bind(this)
    this.meterSelected = this.meterSelected.bind(this)
    this.endChange = this.endChange.bind(this)
    this.startChange = this.startChange.bind(this)

  }

  endChange = date => {this.setState({ dateEnd: date }); console.log(this.state)}
  startChange = date => this.setState({ dateStart: date })

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
          value: build.id + " " + build.unit + " " + build.name,
          text: build.unit + " " + build.name,
        }
        selection.push(x)
      })
      return (

        <Dropdown placeholder='Select Meter' fluid search selection options={selection} onChange={this.meterSelected}/>

      );
    }
  }


  meterSelected(e, name) {
    let x = name.value.split(" ")
    this.setState({ meter: parseInt(x[0]), unit: x[1]});
 }



  render() {

    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  onBuilding(e, name) {
    this.setState({ build: name.value });
    console.log("build ID: " + name.value)
  }

  renderGraph() {
    let pad = {margin : '10px 10px 10px 10px'}
    let barpad = {marginBottom : '8px'}
    return (
        <div style={pad}>
          <Grid columns={2} padded >

            <Grid.Row>
              <Grid.Column >
                <DatePicker
                    name="dateStart"
                    placeholder="Start"
                    value={this.state.dateStart}
                    onChange={this.startChange} />
              </Grid.Column>
              <Grid.Column >
                <DatePicker
                    name="dateEnd"
                    placeholder="End"
                    value={this.state.dateEnd}
                    onChange={this.endChange} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={barpad}>
              <Grid.Column >
          <Dropdown placeholder='Select Building' fluid search selection options={this.DropdownList()}
                    onChange={this.onBuilding}/></Grid.Column>
              <Grid.Column >
          { (this.state.build) ? this.DropdownMeterList() : '' }
              </Grid.Column>
            </Grid.Row>

          </Grid>
          <Container height={'80%'}>
          <Card.Group itemsPerRow={1} >
            { (this.state.meter) && <MeterTextSum meterId={this.state.meter} dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()} unit={this.state.unit}/> }
            { (this.state.meter) && <Graph_LineBrush meterId={this.state.meter} x={'time'} y={'mean'} dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()}/> }
          </Card.Group>
          </Container>

        </div>
    );
  }

}

