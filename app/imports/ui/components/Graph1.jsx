import React from 'react';
import { Card } from 'semantic-ui-react';
import { VictoryPie } from 'victory';

const data = [
  {x: 1, y: 13000},
  {x: 2, y: 16500},
  {x: 3, y: 14250},
  {x: 4, y: 19000}
];

// For displaying percentages in the pie chart.
const getPercent = (num) => {
  const arr = data.map(i => i.y)
  return ((num / arr.reduce((accumulator, currentValue) => accumulator + currentValue)) * 100).toFixed(1)
}

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class Graph1 extends React.Component {
  render() {
    const style={fontFamily: 'Nunito Sans Light', backgroundColor: '#0f2c57', color: 'white'};
    return (
        <Card style={style} raised={true} color={'blue'}>
          <Card.Content>
            <Card.Header style={style} textAlign={'center'}>Recent Activity</Card.Header>
          </Card.Content>
          <Card.Content>
            <svg viewBox="0 0 400 400">
              <VictoryPie
                  standalone={false}
                  width={400} height={400}
                  data={data}
                  labelRadius={100}
                  colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                  style={{ labels: { fontSize: 12, fill: "white" } }}
                  labels={(d) => `${getPercent(d.y)}%`}
              />
            </svg>
          </Card.Content>
        </Card>

    );
  }
}




/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default Graph1;
