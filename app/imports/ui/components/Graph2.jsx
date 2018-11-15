/* eslint-disable no-unused-vars */
import React from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

// For displaying percentages in the pie chart.
const getPercent = (num) => {
  const arr = this.props.data.map(i => i[this.props.y]);
  return ((num / arr.reduce((accumulator, currentValue) => accumulator + currentValue)) * 100).toFixed(1);
};

class Graph2 extends React.Component {
  totalVal() {
    let array = this.props.data;
    array = _.pluck(array, this.props.y);
    return _.reduce(array, function (memo, num) {
      return memo + num;
    }, 0);
  }

  render() {
    const data = this.props.data;
    console.log('graph2');
    const divStyle = { backgroundColor: '#383b4a', display: 'inline-block' };
    const size = 300;
    return (
        <svg style={divStyle} viewBox={`0 0 ${size} ${size}`}>
          <VictoryPie
              labelComponent={<VictoryTooltip
                  x={size / 2} y={size / 2}
                  width={size / 2.5}
                  height={100}
              />}
              standalone={false}
              width={size} height={size}
              data={this.props.data}
              x={this.props.x}
              y={this.props.y}
              labelRadius={100}
              colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
              style={{
                data: { stroke: '#c43a31', strokeWidth: 0.2 },
                parent: { border: '1px solid #5E7480' },
                labels: {
                  fontSize: '10px',
                },
              }}
              labels={(d) => `${d[this.props.x]}: ${(d[this.props.y] * 100 / this.totalVal.bind(this)()).toFixed(1)}%
                          Total: ${d[this.props.y].toFixed(2)} kW
                          Peak: ${d.max.toFixed(2)} kW
                          on ${d.maxDate.toLocaleString()}
                          `}
          />
        </svg>
    );
  }
}

export default Graph2;

Graph2.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.string,
  y: PropTypes.string,
};
Graph2.defaultProps = {
  x: 'x',
  y: 'y',
};
