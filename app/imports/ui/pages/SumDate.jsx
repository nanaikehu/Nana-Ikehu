import React from 'react';
import { Card, Container, Dropdown, Header } from 'semantic-ui-react';
import PieDriver from '../components/PieDriver';
import LineBrushDriver from '../components/LineBrushDriver';

/** A simple static component to render some text for the landing page. */
class SumDate extends React.Component {

  constructor(props) {
    super(props);
    this.date = new Date('2018/10/26');
    this.state = {
      picked: 30, data: '', dateEnd: new Date(this.date).toString(),
      dateStart: this.dateAgo(30).toString()
    };
    this.rangeSelected = this.rangeSelected.bind(this);
    this.dateAgo = this.dateAgo.bind(this);

  }

  rangeSelected(e, name) {
    // console.log(this.state);
    let x = name.value;
    if (x === 999) {
      x = new Date(0);
    } else {
      x = this.dateAgo(x);
      console.log(x)
      this.setState({ dateStart: x.toString(), picked: name.value });
    }
  }

  dateAgo(days) {
      return (this.date) ? new Date(new Date(this.date).setDate(new Date([this.date]).getDate() - days)) : '';
  }

  render() {

    const dropdown = [
      { text: 'Today', value: 1, key: 1 },
      { text: '7 Days', value: 7, key: 2 },
      { text: '30 Days', value: 30, key: 3 },
      { text: '90 Days', value: 90, key: 4 },
      { text: 'All Time', value: 999, key: 5 },
    ];
    console.log(this.state.dateStart)
    console.log(this.state.dateEnd)

    return (
        <div style={{ paddingBottom: '4rem', paddingTop: '4rem' }}>

          <Header inverted textAlign={'center'} as='h2' style={{ fontFamily: 'Montserrat' }}>Energy Dashboard</Header>
          <Container centered style={{ width: '25%', paddingBottom: '2rem' }}>
            <Dropdown fluid selection options={dropdown} onChange={this.rangeSelected} value={this.state.picked}/>
          </Container>
          <Card.Group itemsPerRow={2}>
            <LineBrushDriver dateStart={this.state.dateStart} dateEnd={this.state.dateEnd}/>
            <PieDriver dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} />
          </Card.Group>
        </div>
    );
  }
}

export default SumDate;
