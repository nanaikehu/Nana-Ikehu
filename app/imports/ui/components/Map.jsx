// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Popup, Rectangle,} from 'react-leaflet'
import { Card, Container} from 'semantic-ui-react'
import defaultBuilding from '../../api/building_db/buildingCoor'
import { _ } from 'meteor/underscore';;
import { Link } from 'react-router-dom';




export default class Map1 extends Component {
  constructor(props) {
    super(props)
    this.state = { marker: this.props.marker };
  }





  render() {
    const position = [21.299677843574493, -157.81743038445714]

    return (
        <Card>
          <Map center={position} zoom={17} minZoom={'16'} style={{height: '600px'}}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            {
              defaultBuilding.map( item =>{
            let x = {lat: item.coor[0], lon: item.coor[1]}
             return <Marker position={x}>
                <Popup minWidth={90}>
            <span>
              <Link to={"/building/" + item.code}>Building {item.code}</Link>
            </span>
                </Popup>
              </Marker>}

            )}
          </Map>
        </Card>
    )
  }
}
