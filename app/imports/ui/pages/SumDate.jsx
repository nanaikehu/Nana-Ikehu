import React from 'react';
import { Card, Header,Dropdown } from 'semantic-ui-react';
import { Building } from '../pages/Building';
import PieDriver from '../components/PieDriver';
import LineBrushDriver from '../components/LineBrushDriver';

/** A simple static component to render some text for the landing page. */
class SumDate extends React.Component {

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

  render() {


    let dropdown =[
        {text: "Today", value: 1, key: 1 },
      {text: "7 Days", value: 7, key: 2},
      {text: "30 Days", value: 30, key:3},
      {text: "90 Days", value: 90, key :4},
      {text: "All Time", value: 999, key: 5}

    ];

    return (
        <div style={{paddingBottom: '50px'}}>

          <Header inverted textAlign={'center'} as='h2'>Energy Dashboard</Header>
          <div className = 'grouped'>
            <Dropdown selection options={dropdown} onChange={this.rangeSelected} value={this.state.picked}/>
            <Card.Group itemsPerRow={2} style={{ paddingTop : '10px'}}>
            <LineBrushDriver dateStart={this.state.dateStart} dateEnd={this.state.dateEnd}/>
            <PieDriver dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} />
          </Card.Group>
          </div>
        </div>
    );
  }
}

export default SumDate;
