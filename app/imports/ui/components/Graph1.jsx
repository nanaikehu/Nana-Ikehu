import React from 'react';
import { Card, Loader, Container } from 'semantic-ui-react';
import { VictoryPie, VictoryTheme, VictoryLegend } from 'victory';
import { Buildings, sample } from '../../api/building_db'
import { _ } from 'meteor/underscore'
import { withTracker } from 'meteor/react-meteor-data';

let data = [];
// For displaying percentages in the pie chart.
const getPercent = (num) => {
  const arr = data.map(i => i.y);
  return ((num / arr.reduce((accumulator, currentValue) => accumulator + currentValue)) * 100).toFixed(1);
};

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
export class Graph1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: ''
    }
  }


  render() {
    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {

    const style = { fontFamily: 'Nunito Sans Light', backgroundColor: '#0f2c57', color: 'white' };
    const legendData = [
      { name: "week 1" }, { name: "week 2" }, { name: "week 3" }, { name: "week 4" }, { name: "week 5" }, { name: "week 6" }, { name: "week 7" }
    ];
    let byDay = _.groupBy(this.state.data, item => new Date(item.date).getDay());
    let data = [];
    console.log(byDay)
    _.each(byDay, function(weekday, index){
      let kws = _.pluck(weekday, 'kw')
      kws = _.map(kws, num => parseFloat(num))
      kws = _.filter(kws, item1 => isFinite(item1));
      console.log(kws)
      let sum = _.reduce(kws, function(memo, num){ return memo + parseFloat(num); }, 0);
      console.log(sum)
      data.push({x:index, y:sum})
    })

    // console.log("data "+data)

    return (
        <Container>
          <Card style={style} raised={true} color={'red'}>
            <Card.Content>
              <Card.Header style={style} textAlign={'center'}>Recent Activity</Card.Header>
              <hr/>
            </Card.Content>
            <Card.Content>
              <svg viewBox="0 0 600 600">
                <VictoryLegend standalone={false}
                               colorScale={["tomato", "orange", "gold", "cyan", "navy", "red", "green"]}
                               x={15} y={0}
                               gutter={20}
                               orientation="horizontal"
                               title="% usage of kW/week"
                               centerTitle
                               style={{
                                 border: { stroke: "white" },
                                 labels: { fill: "white" },
                                 title: {fontSize: 20, fill: "white" }
                               }}
                               data={legendData}
                />

                <VictoryPie
                    standalone={false}
                    padAngle={3}
                    innerRadius={100}
                    width={550} height={550}
                    data={data}
                    labelRadius={60}
                    padding={{
                      left: 15, bottom: 20, top: 80
                    }}
                    colorScale={["tomato", "orange", "gold", "cyan", "navy", "red", "green"]}
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
        </Container>
    );
  }
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  this.state.data = '';
  Meteor.call('getAllbyDate', new Date('2/20/2018'), new Date('2/21/2018') , (err, res) => this.state.data = res)

})(Graph1);

