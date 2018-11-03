// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Popup, Rectangle,} from 'react-leaflet'
import { Card, Container} from 'semantic-ui-react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

const addressPoints =[[21.30389991490436, -157.81513986177745, "200"], [21.30141455749965, -157.82052573747936, "500"], [21.301293240432628,  -157.81430925708267, "1000"], [21.29705324949744, -157.8167632687837, "2000"], [21.300067998820815, -157.8209458384663, "5000"], [21.297467503959826, -157.82024481799456, "10000"]];
const biomedical = [[21.30389991490436, -157.81513986177745], [21.30305957111875, -157.8141431696713]];
const business = [[21.30141455749965, -157.82052573747936], [21.300744911029966, -157.81990413554016]];
const korean = [[21.301293240432628,  -157.81430925708267], [21.30097231784676, -157.81407800037414]];
const eng = [[21.29705324949744, -157.8167632687837], [21.296801002358706, -157.81545300967994]];
const architecture = [[21.300067998820815, -157.8209458384663], [21.29946402306616, -157.82051257789135]];
const bachman = [[21.297467503959826, -157.82024481799456], [21.297123535000768, -157.8197948355228]];


export default class Map1 extends Component {
  state = {
    center: {
      lat: 21.299677843574493,
      lng: -157.81743038445714
    },
    marker: {
      lat: 21.299677843574493,
      lng: -157.81743038445714
    },
    zoom: 16,
    draggable: true,
  }

  refmarker = React.createRef()

  getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
                d > 100  ? '#FC4E2A' :
                    d > 50   ? '#FD8D3C' :
                        d > 20   ? '#FEB24C' :
                            d > 10   ? '#FED976' :
                                '#FFEDA0';
  }

  style(feature) {
    return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable })
  }

  updatePosition = () => {
    const marker = this.refmarker.current
    console.log(this.refmarker.current)
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng(),
      })
    }
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng]
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]

    return (
        <Card>
          <Map center={position} zoom={this.state.zoom} minZoom={'16'} style={{height: '600px'}}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker
                draggable={this.state.draggable}
                onDragend={this.updatePosition}
                position={markerPosition}
                ref={this.refmarker}>
              <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
            </span>
              </Popup>
            </Marker>

            <Rectangle bounds={biomedical} fillColor="red" >
              <Popup>
                Some data could go here
              </Popup>
            </Rectangle>
            <Rectangle bounds={business} fillColor="red"><Popup>
              Some data could go here
            </Popup>
            </Rectangle>
            <Rectangle bounds={eng} fillColor="red" ><Popup>
              Some data could go here
            </Popup>
            </Rectangle>
            <Rectangle bounds={bachman} fillColor="red" ><Popup>
              Some data could go here
            </Popup>
            </Rectangle>
            <Rectangle bounds={architecture} fillColor="red">
              <Popup>
                Some data could go here
              </Popup>
            </Rectangle>
            <Rectangle bounds={korean} fillColor="red" >
              <Popup>
                Some data could go here
              </Popup>
            </Rectangle>
            <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={addressPoints}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
          </Map>
        </Card>
    )
  }
}
