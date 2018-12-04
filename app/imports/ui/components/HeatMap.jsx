// @flow

import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import addressPoints from '../../api/building_db/HeatMapData';



export default class Map2 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '', HeatData: '', marker: this.props.marker, dateStart: '', dateEnd: '', meter: '' };
    this.state.dateStart = this.props.dateStart;
    this.state.dateEnd = this.props.dateEnd;
  }





  render() {
    const position = [21.299677843574493, -157.81743038445714];
    return (

        <Map center={position} zoom={17} minZoom={'15'} style={{ height: '600px' }}>
          <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={addressPoints}
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              intensityExtractor={m => parseFloat(m[2])}
              gradient={{ 0.0: 'green', 0.4: 'blue', 0.8: 'orange', 1.0: 'red' }}
              minOpacity={0.7}
              radius={60}

          />
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
