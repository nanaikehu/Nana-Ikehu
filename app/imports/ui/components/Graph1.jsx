import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryPie, VictoryTheme, VictoryLegend } from 'victory';
import { Buildings, sample } from '../../api/building_db'
import { _ } from 'meteor/underscore'
import { withTracker } from 'meteor/react-meteor-data';

let data = [];
// For displaying percentages in the pie chart.
const getPercent = (num) => {
  const arr = data.map(i => i.y)
  return ((num / arr.reduce((accumulator, currentValue) => accumulator + currentValue)) * 100).toFixed(1);
}

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
export class Graph1 extends React.Component {

  render() {
    return (this.props.ready) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {
    // console.log("building "+Buildings);

    const style = { fontFamily: 'Nunito Sans Light', backgroundColor: '#0f2c57', color: 'white' };
    let byDay = _.groupBy(this.props.data, item => new Date(item.date).getDay());
    // console.log("byDay "+byDay);
    _.each(byDay, function(weekday, index){
      let kws = _.pluck(weekday, 'kw')
      kws = _.map(kws, num => parseFloat(num))
      kws = _.filter(kws, item1 => isFinite(item1));
      // console.log("kws "+kws);
      var sum = _.reduce(kws, function(memo, num){ return memo + parseFloat(num); }, 0);
      // console.log("sum "+sum);
      data.push({x:`Day ${index}`, y:sum})
    })

    // console.log("data "+data)

    return (
          <Card style={style} raised={true} color={'red'}>
            <Card.Content>
              <Card.Header style={style} textAlign={'center'}>Recent Activity</Card.Header>
              <hr/>
            </Card.Content>
            <Card.Content>
              <svg viewBox="0 0 400 400">
                <VictoryLegend x={125} y={10}
                               title="Percentage kw usage/week"
                               centerTitle
                               orientation="horizontal"
                               gutter={20}
                               style={{ border: { stroke: "black" } }}
                               colorScale={[ "tomato", "orange", "gold", "cyan", "navy", "red", "green" ]}
                               data={[
                                 { name: "Week 1" }, { name: "Week 2" }, { name: "Week 3" }, { name: "Week 4" }, { name: "Week 5" }, { name: "Week 6" }, { name: "Week 7" }
                               ]}
                />

              <VictoryPie
                  standalone={false}
                  padAngle={3}
                  innerRadius={100}
                  width={400} height={400}
                  data={data}
                  labelRadius={60}
                  colorScale={["tomato", "orange", "gold", "cyan", "navy", "red", "green" ]}
                  style={{ labels: { fontSize: 10, fill: "white" } }}
                  theme={VictoryTheme.material}
                  labels={(d) => `${getPercent(d.y)}%`}
                  events={[{
                    target: "data",
                    eventHandlers: {
                      onClick: () => {
                        return [
                          {
                            target: "data",
                            mutation: (props) => {
                              const fill = props.style && props.style.fill;
                              return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                            }
                          }, {
                            target: "labels",
                            mutation: (props) => {
                              return props.text === "clicked" ? null : { text: "clicked" };
                            }
                          }
                        ];
                      }
                    }
                  }]}
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

