// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import { Container, Grid, Button, Confirm, Header } from 'semantic-ui-react'
import defaultBuilding from '../../api/building_db/buildingCoor'
import { Link } from 'react-router-dom';
import BuildingForMap from './BuildingForMap'
import Calendar from 'react-calendar';




export default class Map1 extends Component {
  constructor(props) {
    super(props)
    let today = new Date()
    let priorDate = new Date().setDate(today.getDate()-30)
    this.state = { open: false, marker: this.props.marker, dateStart: new Date(priorDate), dateEnd: new Date(today)};
    this.endChange = this.endChange.bind(this)
    this.startChange = this.startChange.bind(this)

  }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  endChange = date => {this.setState({ dateEnd: date }); console.log(this.state)}
  startChange = date => this.setState({ dateStart: date })


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd ) {
      let self = this;
      this.setState({data : ''})
      Meteor.call("sumByDate", new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
        if(error) {
          console.log('SimpleLine' + error)
        } else {
          console.log("res + for ID " + this.state.meterId)

          console.log(response)

          self.setState({ data : response });
        }
      });
    }
  }

  componentWillMount() {
    const self = this;
    Meteor.call("sumByDate", new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
      if(error) {
        console.log('SimpleLine' + error)
      } else {

        console.log(response)
        self.setState({ data : response });
      }
    });
  }

  render()
{
    const position = [21.299677843574493, -157.81743038445714]
    const pickerColor = { color: '#fff' }
    const style = { textAlign: 'center' }
    const pad = {marginTop : '4em'}
    const pad1 = {marginTop : '16em'}
    return (

        <Grid columns={2} centered>
          <Grid.Row style={pad} columns={3}>
              <Grid.Column style={style}><Calendar style={{border: 'none'}} className='datePicker'
                          value={this.state.dateStart}
                          onChange={this.startChange} /></Grid.Column>
            <Grid.Column style={style}><Header inverted>Change to Heat Map</Header></Grid.Column>
              <Grid.Column style={style}><Calendar className='datePicker' style={pickerColor}
                          value={this.state.dateEnd}
                          onChange={this.endChange} /></Grid.Column>
          </Grid.Row>
            <Grid.Row>
          <Button onClick={this.open}>Show</Button>
          <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
            </Grid.Row>
          <Grid.Row>
            <Grid.Column style={pad1}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Container>
          <Map center={position} zoom={17} minZoom={'17'} style={{height: '600px'}}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            {
              defaultBuilding.map( item =>{
            let x = {lat: item.coor[0], lon: item.coor[1]}
             return <Marker position={x}>
                <Popup minWidth={350}>
                  <Container>
              <BuildingForMap build={item.code} dateStart={this.state.dateStart} dateEnd={this.state.dateEnd}/>
                  <p/>
              <Link to={"/building/" + item.code}>Building {item.code}</Link>
                  </Container>
                </Popup>
              </Marker>}

            )}
          </Map>
          </Container>
          </Grid.Row>
        </Grid>
    )
  }
}
