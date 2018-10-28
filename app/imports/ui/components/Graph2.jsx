import React from 'react';
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

class Graph2 extends React.Component {
  render() {
    return (
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
    );
  }
}

export default Graph2;
