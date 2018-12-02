import React from 'react';
import { Button, Card, Container, Dropdown, Grid, Icon, Loader, Segment, Menu, Sidebar } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-date-picker';
import PropTypes from 'prop-types';
import { Graph_LineBrush } from '../components/Graph_LineBrush';
// import { SideBarMenu } from '../components/SideBarMenu';
import MeterTextSum from '../components/MeterTextSum';
import { Link } from 'react-router-dom';

export default class Building extends React.Component {

  constructor(props) {
    super(props);
    const today = new Date(2018, 9, 31);
    /* exported priorDate */
// eslint-disable-next-line no-unused-vars
    const priorDate = new Date().setDate(today.getDate() - 30);
    const maxDate = new Date(2018, 9, 1);
    this.state = { visible: false, data: '', dateStart: new Date(maxDate), dateEnd: today, meter: '' };
    this.DropdownList = this.DropdownList.bind(this);
    this.onBuilding = this.onBuilding.bind(this);
    this.DropdownMeterList = this.DropdownMeterList.bind(this);
    this.meterSelected = this.meterSelected.bind(this);
    this.endChange = this.endChange.bind(this);
    this.startChange = this.startChange.bind(this);
    this.handleHideClick = () => this.setState({ visible: false })
    this.handleShowClick = () => this.setState({ visible: true })
    this.handleSidebarHide = () => this.setState({ visible: false })


    if (this.props.match.params.code) {
      this.state.build = this.props.match.params.code;
    }

  }

  endChange = date => {
    this.setState({ dateEnd: date });
    // console.log(this.state);
  };

  startChange = date => this.setState({ dateStart: date });

  componentWillMount() {
    const self = this;
    Meteor.call('getBuildings', (error, response) => {
      if (error) {
        // console.log(`Building${error}`);
      } else {
        // console.log('res+ build ');
        // console.log(response);

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

// eslint-disable-next-line consistent-return
  DropdownMeterList() {
    if (this.state.build) {
      // console.log(this.state.data);
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
      return (
          <Dropdown placeholder='Select Meter' fluid search selection options={selection}
                    onChange={this.meterSelected} defaultValue={selection[0].value}/>
      );
    }
  }

  meterSelected(e, name) {
    const x = name.value.split('');
    this.setState({ meter: parseInt(x[0], 10), unit: x[1] });
  }

  render() {
    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  onBuilding(e, name) {
    this.setState({ build: name.value });
    // console.log(`build ID: ${name.value}`);
  }

  renderGraph() {
    const pad = { paddingTop: '4rem', paddingBottom: '4rem', overflow: 'hidden', minHeight: '100vh' };
    const barpad = { marginBottom: '8px' };
    // const pickerColor = { color: '#fff' }
    const pickerStyle = {
      textAlign: 'center',
      backgroundColor: '#ECF2FF',
      color: 'black',
      borderRadius: '6rem',
      padding: '.5rem',
    };

    const { visible } = this.state

    return (
        <div>
          <Button disabled={visible} onClick={this.handleShowClick}>
            <Icon name='sidebar'></Icon>
          </Button>

          <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={this.handleSidebarHide}
                vertical
                visible={visible}
                width='thin'
            >
              <Menu.Item as='a'>
                <Icon name='home' />
                <Link to='/' activeClassName="active">Home</Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='building outline' />
                <Link to='/building' activeClassName="active">Building</Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='map outline' />
                <Link to='/map' activeClassName="active">Map</Link>
              </Menu.Item>
            </Sidebar>
              <div style={pad}>
                <Grid columns={2} centered>
                  <Grid.Row>
                    <Grid.Column style={pickerStyle}>
                      <div style={{ display: 'inline-block', marginRight: '2rem' }}>
                        <span>Start Date: </span>
                        <DatePicker
                            className='datePicker'
                            style={{ border: 'none' }}
                            name="dateStart"
                            placeholder="Start"
                            value={this.state.dateStart}
                            onChange={this.startChange}
                        />
                      </div>
                      <div style={{ display: 'inline-block', marginLeft: '2rem' }}>
                        <span>End Date: </span>
                        <DatePicker
                            className='datePicker'
                            name="dateEnd"
                            placeholder="End"
                            value={this.state.dateEnd}
                            onChange={this.endChange}
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Column style={barpad}>
                    <Grid.Row>
                      <Dropdown placeholder='Select Building' fluid search selection options={this.DropdownList()}
                                onChange={this.onBuilding} value={this.state.build}/>
                    </Grid.Row>
                    <Grid.Row>
                      {(this.state.build) ? this.DropdownMeterList() : ''}
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
                <Container style={{ height: '100%' }}>
                  <Card.Group itemsPerRow={1}>
                    {(this.state.meter) &&
                    <MeterTextSum meterId={this.state.meter} dateStart={this.state.dateStart.toString()}
                                  dateEnd={this.state.dateEnd.toString()} unit={this.state.unit}/>}
                    {(this.state.meter) && <Graph_LineBrush meterId={this.state.meter} x={'time'} y={'mean'}
                                                            dateStart={this.state.dateStart.toString()}
                                                            dateEnd={this.state.dateEnd.toString()}/>}
                  </Card.Group>
                </Container>
              </div>
          </Sidebar.Pushable>
        </div>
    );
  }

}

Building.propTypes = {
  match: PropTypes.shape,
  params: PropTypes.shape,
};
