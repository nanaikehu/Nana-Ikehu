import React from 'react';
import { Card, Container, Header,Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Graph_SimpleLine } from '../components/Graph_SimpleLine';
import { Graph1 } from '../components/Graph1';
import { Building } from '../pages/Building';
<<<<<<< HEAD
import { _ } from 'meteor/underscore';

import Map1 from '../components/Map'
=======
import Graph2 from '../components/Graph2';
import PieDriver from '../components/PieDriver';
import { Graph_LineBrush } from '../components/Graph_LineBrush';
import LineBrushDriver from '../components/LineBrushDriver';
>>>>>>> fe4331617884379eb78e7166976c42ac84809954

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

<<<<<<< HEAD
=======
  constructor(props) {
    super(props)
    this.date = new Date();
    this.state = { picked : 30, data: '', dateEnd: new Date().toString(), dateStart: this.dateAgo(30).toString() };
    this.rangeSelected = this.rangeSelected.bind(this);
    this.dateAgo = this.dateAgo.bind(this)

  }

    rangeSelected(e, name) {
    console.log(this.state)
      let x = name.value;
    if(x == 999)
      x = new Date(0);
    else
      x = this.dateAgo(x)
    this.setState({ dateStart: x.toString(), picked : name.value});
  }



dateAgo(days){
    console.log(this.date)
  return (this.date) ? new Date(new Date().setDate(new Date([this.date]).getDate()-days)) : ''
}

>>>>>>> fe4331617884379eb78e7166976c42ac84809954
  render() {


    let dropdown =[
        {text: "Today", value: 1, key: 1 },
      {text: "7 Days", value: 7, key: 2},
      {text: "30 Days", value: 30, key:3},
      {text: "90 Days", value: 90, key :4},
      {text: "All Time", value: 999, key: 5}

    ];

    return (
        <div className = 'landing-background' style={{paddingBottom: '50px'}}>

          <Header inverted textAlign={'center'} as='h2'>Energy Dashboard</Header>
<<<<<<< HEAD
          <Card.Group itemsPerRow={1}>
            <Map1/>
=======
          <div className = 'grouped'>
            <Dropdown selection options={dropdown} onChange={this.rangeSelected} value={this.state.picked}/>
            <Card.Group itemsPerRow={2} style={{ paddingTop : '10px'}}>
            <LineBrushDriver dateStart={this.state.dateStart} dateEnd={this.state.dateEnd}/>
            <PieDriver dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} />
>>>>>>> fe4331617884379eb78e7166976c42ac84809954
          </Card.Group>
          </div>
        </div>
    );
  }
}

export default Landing;
