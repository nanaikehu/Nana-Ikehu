import React from 'react';
import { _ } from 'meteor/underscore'
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Loader,Container } from 'semantic-ui-react';
import { VictoryPie } from 'victory';
import { Buildings, sample } from '../../api/building_db';

/*
const data = [
  {x: 1, y: 13000},
  {x: 2, y: 16500},
  {x: 3, y: 14250},
  {x: 4, y: 19000}
];
*/

let data = [];

// For displaying percentages in the pie chart.
const getPercent = (num) => {
  const arr = data.map(i => i.y);
  return ((num / arr.reduce((accumulator, currentValue) => accumulator + currentValue)) * 100).toFixed(1);
};

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
export class Graph1 extends React.Component {

  render() {
    return (this.props.ready) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {
    // console.log(Buildings);

    const style = { fontFamily: 'Nunito Sans Light', backgroundColor: 'gray', color: 'white' };
    const byDay = _.groupBy(this.props.data, item => new Date(item.date).getDay());
    // console.log(byDay)
    _.each(byDay, function(weekday, index){
      let kws = _.pluck(weekday, 'kw')
      kws = _.map(kws, num => parseFloat(num))
      kws = _.filter(kws, item1 => isFinite(item1));
      // console.log(kws)
      var sum = _.reduce(kws, function(memo, num){ return memo + parseFloat(num); }, 0);
      // console.log(sum)
      data.push({ x: index, y: sum });
    })

    // console.log(data)

    return (
        <Card>
          <Card.Content>
            <Card.Header style={style} textAlign={'center'}>Recent Activity</Card.Header>
            <hr/>
          </Card.Content>
          <Card.Content>
            <svg viewBox="0 0 400 400">
              <VictoryPie
                  standalone={false}
                  width={400} height={400}
                  data={data}
                  labelRadius={100}
                  colorScale={['#51BCCD', '#F5B14F', '#6AD1A4', '#BDDA6D', '#F18F4C', '#EDD85F']}
                  style={{ data: { stroke: '#5E7480', strokeWidth: 3 }, labels: { fontSize: 12, fill: '#5E7480' } }}
                  labels={(d) => `${getPercent(d.y)}%`}
              />
            </svg>
          </Card.Content>
        </Card>
      );
    }
  }

    /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
  export default withTracker(() => {
    const subscription = Meteor.subscribe('sample');
    return {
    data: sample.find({}).fetch(),
    ready: subscription.ready(),
  };
  })(Graph1);
