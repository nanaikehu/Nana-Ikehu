import React from 'react';
import { VictoryBar, VictoryChart } from 'victory';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class Graph1 extends React.Component {
  render() {
    return (
        <VictoryChart>
          <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
          />
        </VictoryChart>
    );
  }
}




/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default Graph1;
