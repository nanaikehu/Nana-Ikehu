// @flow
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import PropTypes from 'prop-types';
import defaultBuilding from '../../api/building_db/buildingCoor';
import BuildingForMap from './BuildingForMap';

export default class Map1 extends Component {
  constructor(props) {
    super(props);
    const today = new Date(2018, 9, 31);
    const priorDate = new Date().setDate(today.getDate() - 30);
    const maxDate = new Date(2018, 9, 1);
    this.state = { marker: this.props.marker, dateStart: new Date(maxDate), dateEnd: new Date(today) };
    this.endChange = this.endChange.bind(this);
    this.startChange = this.startChange.bind(this);
  }

  endChange = date => {
    this.setState({ dateEnd: date });
    console.log(this.state);
  };

  startChange = date => this.setState({ dateStart: date });

  render() {
    const position = [21.299677843574493, -157.81743038445714];
    const pickerStyle = {
      textAlign: 'center',
      backgroundColor: '#ECF2FF',
      color: 'black',
      borderRadius: '6rem',
      padding: '.5rem',
    };
    const style = { textAlign: 'center' };
    const pad = { marginTop: '4em' };

    return (
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
            <Container height={'80%'}>
              <Map center={position} zoom={17} minZoom={'17'} style={{ height: '600px' }}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                />
                {
                  defaultBuilding.map(item => {
                        const x = { lat: item.coor[0], lon: item.coor[1] };
                        return <Marker position={x}>
                          <Popup minWidth={350}>
                            <BuildingForMap build={item.code} dateStart={this.state.dateStart}
                                            dateEnd={this.state.dateEnd}/>
                            <p/>
                            <Link to={`/building/${item.code}`}>Building {item.code}</Link>
                          </Popup>
                        </Marker>;
                      })}
              </Map>
            </Container>
          </Grid>
        </div>
    );
  }
}

Map1.propTypes = {
  marker: PropTypes.string,
};
