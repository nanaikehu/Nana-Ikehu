import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { VictoryPie } from 'victory';
import { Buildings, sample } from '../../api/building_db';

const data = [
  { x: 1, y: 13000 },
  { x: 2, y: 16500 },
  { x: 3, y: 14250 },
  { x: 4, y: 19000 },
];

// For displaying percentages in the pie chart.
const getPercent = (num) => {
  const arr = data.map(i => i.y);
  return ((num / arr.reduce((accumulator, currentValue) => accumulator + currentValue)) * 100).toFixed(1);
};

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class Graph1 extends React.Component {
  render() {
    console.log(Buildings);
    const style = { fontFamily: 'Nunito Sans Light', backgroundColor: 'gray', color: 'white' };
    return (
        <Card>
          <Card.Content raised={true}>
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

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default Graph1;
