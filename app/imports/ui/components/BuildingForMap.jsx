import React from 'react';
import { Card, Container, Loader } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Meteor } from "meteor/meteor";
import MeterTextSum from './MeterTextSum'

export default class Building extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: '', dateStart: '', dateEnd: '', meter: '' };
    this.DropdownList = this.DropdownList.bind(this);
    this.onBuilding = this.onBuilding.bind(this)
    this.DropdownMeterList = this.DropdownMeterList.bind(this)
    this.meterSelected = this.meterSelected.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    if (this.props.build) {
      this.state.build = this.props.build;

    }
    this.state.dateStart = this.props.dateStart;
    this.state.dateEnd = this.props.dateEnd;

  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd ) {
      let self = this;
      this.setState({dateStart : this.props.dateStart})
      this.setState({dateEnd : this.props.dateEnd})
      this.setState({data : ''})
      Meteor.call("getBuildings", (error, response) => {
        if (error) {
          console.log('Building' + error)
        } else {
          console.log("res+ build ")
          console.log(response)
          self.setState({ data: response});
        }
      });
    }
  }

  componentWillMount() {
    const self = this;
    Meteor.call('getBuildings', (error, response) => {
      if (error) {
        console.log(`Building, ${error}`);
      } else {
        console.log('res+ build ');
        console.log(response);

        self.setState({ data: response });

      }
    });
  }

  DropdownList() {
    const builds = this.state.data;
    const selection = [];
    _.forEach(builds, build => {
      const x = {
        key: build.code,
        value: build.code,
        text: build.name,
      };
      selection.push(x);
    });

    return selection;
  }

  DropdownMeterList() {
    if (this.state.build) {
      console.log(this.state.data);
      const selected = _.findWhere(this.state.data, { code: this.state.build });

      const selection = [];
      _.forEach(selected.meters, build => {
        const x = {
          key: build.id,
          value: `${build.id}${build.unit}${build.name}`,
          text: `${build.unit}${build.name}`,
        };
        selection.push(x);
      });
      if (this.state.meter === '') {
        this.setState({ meter: selection[0].key, unit: 'kW' });
      }
    }
  }

  meterSelected(e, name) {
    const x = name.value.split(' ');
    this.setState({ meter: parseInt(x[0], 10), unit: x[1] });
  }

  render() {

    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  onBuilding(e, name) {
    this.setState({ build: name.value });
    console.log(`build ID: ${name.value}`);
  }

  renderGraph() {
    const pad = { marginTop: '4em' };
    return (
        <div style={pad}>
          {(this.state.build) ? this.DropdownMeterList() : ''}
          <Container height={'80%'}>
            <Card.Group itemsPerRow={1}>
              {(this.state.meter) &&
              <MeterTextSum meterId={this.state.meter} dateStart={this.state.dateStart.toString()}
                            dateEnd={this.state.dateEnd.toString()} unit={this.state.unit}/>}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

