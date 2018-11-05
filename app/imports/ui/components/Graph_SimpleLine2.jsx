import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer  } from 'victory';
import PropTypes from 'prop-types';

const style = { fontFamily: 'Nunito Sans Light', backgroundColor: 'gray', color: 'white' };

export class Graph_SimpleLine2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: '',
    };

  }

  // componentDidMount() {
  //   this.setState({ data: this.props.data });
  // }

  render() {
    return (this.props.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {
    // console.log(this.state.data.SampleTsUtc);
  // render() {
    return (
        <Card>
          <Card.Content>
            <Card.Content>
              <Card.Header style={style} textAlign={'center'}>Recent Activity</Card.Header>
              <hr/>
            </Card.Content>
            <Card.Content>

              <VictoryChart
                  theme={VictoryTheme.material}
                  scale={{ x: 'time' }}
                  containerComponent={
                    <VictoryZoomContainer zoomDimension='x'/>
                  }
              >
                <VictoryLine
                    style={{
                      data: { stroke: '#c43a31' },
                      parent: { border: '1px solid #ccc' },
                    }}
                    data={this.props.data}
                    x={this.props.time}
                    y={this.props.mean}
                />


              </VictoryChart>
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}
Graph_SimpleLine2.propTypes = {
  meterId: PropTypes.number.isRequired,
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  time: PropTypes.string,
  mean: PropTypes.string,
  data: PropTypes.array,
};
Graph_SimpleLine2.defaultProps = {
  time: 'time',
  mean: 'mean',
};
