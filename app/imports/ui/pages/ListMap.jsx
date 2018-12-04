import React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import Map1 from '../components/Map'
import Map2 from '../components/HeatMap'
import Calendar from "react-calendar";

/** A simple static component to render some text for the landing page. */
class ListMap extends React.Component {
  constructor(props) {
    super(props)
    let today = new Date('2018/10/26')
    let priorDate = new Date('2018/09/26')
    this.state = {map: {}, open: false, dateStart: new Date(priorDate), dateEnd: new Date(today), calendar1: {}, calendar2: {}};
    this.endChange = this.endChange.bind(this)
    this.startChange = this.startChange.bind(this)

  }
  endChange = date => {this.setState({ dateEnd: date }); console.log(this.state)}
  startChange = date => this.setState({ dateStart: date })
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  componentDidUpdate(prevProps) {
    if (this.state.open !== prevProps.open) {
      if(this.state.open){
        this.state.map = <Map2/>;
        this.state.calendar1 = <div/>;
        this.state.calendar2 = <div/>;
      }
      else{
        this.state.map = <Map1 dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()}/>;
        this.state.calendar1 = <Calendar style={{border: 'none'}} className='datePicker'
                                         value={this.state.dateStart}
                                         onChange={this.startChange} />;
        this.state.calendar2 = <Calendar className='datePicker'
                                         value={this.state.dateEnd}
                                         onChange={this.endChange} />;
      }
    }
  }

  componentWillMount() {
    if(this.state.open){
      this.state.map = <Map2/>;
      this.state.calendar1 = <div/>;
      this.state.calendar2 = <div/>;
    }
    else{
      this.state.map = <Map1 dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()}/>;
      this.state.calendar1 = <Calendar style={{border: 'none'}} className='datePicker'
                                       value={this.state.dateStart}
                                       onChange={this.startChange} />;
      this.state.calendar2 = <Calendar className='datePicker'
                                       value={this.state.dateEnd}
                                       onChange={this.endChange} />;
    }
  }

  render() {
    const style = { textAlign: 'center' }
    const pad = {marginTop : '4em'}

    return (
        <Grid columns={2} centered>
          <Grid.Row style={pad} columns={3}>
            <Grid.Column style={style}>{this.state.calendar1}</Grid.Column>
            <Grid.Column style={style}>
              <Header inverted>Change to Heat Map</Header>
              <p/>
              <Button onClick={this.open}>Show</Button>
              <Header inverted>Change to Marker Map</Header>
              <p/>
              <Button onClick={this.close}>Show</Button>
            </Grid.Column>
            <Grid.Column style={style}>{this.state.calendar2}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Container>
              {this.state.map}
            </Container>
          </Grid.Row>
        </Grid>
    );
  }
}

export default ListMap;
