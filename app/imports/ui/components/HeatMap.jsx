// @flow

import React, { Component } from 'react';
import { Map, Marker, Popup,TileLayer, LayersControl, FeatureGroup } from 'react-leaflet';
import PropTypes from 'prop-types';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { _ } from 'meteor/underscore';
import defaultBuilding from '../../api/building_db/buildingCoor';
import addressPoints from '../../api/building_db/HeatMapData';
import { Meteor } from "meteor/meteor";



export default class Map2 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '', HeatData: '', marker: this.props.marker, dateStart: '', dateEnd: '', meter: '' };
    this.state.dateStart = this.props.dateStart;
    this.state.dateEnd = this.props.dateEnd;
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //
  //   if (this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd) {
  //     const self = this;
  //     this.setState({ data: '' });
  //     Meteor.call('sumByDate', new Date(this.props.dateStart), new Date(this.props.dateEnd), (error, response) => {
  //       if (error) {
  //         // console.log(`SimpleLine${error}`);
  //       } else {
  //         // console.log(`res + for ID ${this.state.meterId}`);
  //         // console.log(response);
  //
  //         self.setState({ data: response });
  //       }
  //     });
  //   }
  // }
  //
  // componentWillMount() {
  //   const self = this;
  //   Meteor.call('sumByDate', new Date(this.props.dateStart), new Date(this.props.dateEnd), (error, response) => {
  //     if (error) {
  //       // console.log(`SimpleLine${error}`);
  //     } else {
  //        // console.log(response);
  //        // console.log(this.props.dateStart);
  //        // console.log(this.props.dateEnd);
  //       self.setState({ data: response });
  //     defaultBuilding.map( item =>{(this.state.data.buildings.map(e => {(e.name === item.name) ? (item.value = e.sum) : null}))});
  //       self.setState({ HeatData: defaultBuilding });
  //
  //     }
  //   });
  // }



  render() {
    const position = [21.299677843574493, -157.81743038445714];
    // const dataCoor = _.pluck(this.state.HeatData, "coor")
    // const dataValue = _.pluck(this.state.HeatData, "value");
    //
    // console.log(dataCoor)
    // console.log(dataValue)
    return (

        <Map center={position} zoom={17} minZoom={'17'} style={{ height: '600px' }}>
          <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={addressPoints}
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              intensityExtractor={m => parseFloat(m[2])} />
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />

          </Map>

          

    );
  }
}

Map2.propTypes = {
  marker: PropTypes.object,
  dateStart: PropTypes.object,
  dateEnd: PropTypes.object,

};
