import React from 'react';
import { Button, Card, Confirm, Container, Grid, Header } from 'semantic-ui-react';
import Map1 from '../components/Map'
import Calendar from "react-calendar";


/** A simple static component to render some text for the landing page. */
class ListMap extends React.Component {
    constructor(props) {
    super(props)
    let today = new Date('2018/11/01')
    let priorDate = new Date().setDate(today.getDate()-30)
    this.state = { open: false, dateStart: new Date(priorDate), dateEnd: new Date(today)};
    this.endChange = this.endChange.bind(this)
    this.startChange = this.startChange.bind(this)

  }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  endChange = date => {this.setState({ dateEnd: date }); console.log(this.state)}
  startChange = date => this.setState({ dateStart: date })

  render() {
    const pickerColor = { color: '#fff' }
    const style = { textAlign: 'center' }
    const pad = {marginTop : '4em'}
    return (
        <Grid columns={2} centered>
          <Grid.Row style={pad} columns={3}>
            <Grid.Column style={style}><Calendar style={{border: 'none'}} className='datePicker'
                                                 value={this.state.dateStart}
                                                 onChange={this.startChange} /></Grid.Column>
            <Grid.Column style={style}>
              <Header inverted>Change to Heat Map</Header>
              <p/>
              <Button onClick={this.open}>Show</Button>
              <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
            </Grid.Column>
            <Grid.Column style={style}><Calendar className='datePicker' style={pickerColor}
                                                 value={this.state.dateEnd}
                                                 onChange={this.endChange} /></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Container>
              <Map1 dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()}/>
            </Container>
          </Grid.Row>
        </Grid>
    );
  }
}

export default ListMap;
