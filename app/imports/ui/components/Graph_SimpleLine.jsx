import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer  } from 'victory';
import PropTypes from 'prop-types';

export class Graph_SimpleLine extends React.Component {

  constructor (props) {
    super(props)
    this.state = { data : '' };

  }
  componentWillMount() {
    const self = this;
    Meteor.call("getMeter", this.props.meterId ,(error, response) => {
      if(error) {
      console.log('SimpleLine' + error)
      } else {
        console.log("res+ ")
        console.log(response)
        self.setState({ data : response });
      }
    });
  }


  render() {
    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {

    return (

            <VictoryChart
                theme={VictoryTheme.material}
                scale={{x : 'time'}}
                containerComponent={
                  <VictoryZoomContainer zoomDimension="x"/>
                }
            >
              <VictoryLine
                  style={{
                    data: { stroke: "#c43a31",  strokeWidth: 0.2      },
                    parent: { border: "1px solid #ccc"}
                  }}
                  data={this.state.data}
                  x={this.props.x}
                  y={this.props.y}
              />


            </VictoryChart>
    );
  }
}
Graph_SimpleLine.propTypes = {
  meterId: PropTypes.number.isRequired,
  x: PropTypes.string,
  y: PropTypes.string
};
Graph_SimpleLine.defaultProps = {
  x: 'x',
  y: 'y'
};