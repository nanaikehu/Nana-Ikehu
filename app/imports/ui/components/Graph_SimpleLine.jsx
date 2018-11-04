import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer  } from 'victory';
import PropTypes from 'prop-types';

const style = { fontFamily: 'Nunito Sans Light', backgroundColor: 'gray', color: 'white' };

export class Graph_SimpleLine extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: '',
    };

  }
  componentWillMount() {
    const self = this;
    Meteor.call('getMeter', this.props.meterId , (error, response) => {
      if (error) {
      console.log('SimpleLine' + error);
      } else {
        console.log('res+ ')
        console.log(response)
        self.setState({ data: response });
      }
    });
  }

  render() {
    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {
    // console.log(this.state.data[0].time);
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
                    data={this.state.data}
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
Graph_SimpleLine.propTypes = {
  meterId: PropTypes.number.isRequired,
  time: PropTypes.string,
  mean: PropTypes.string,
};
Graph_SimpleLine.defaultProps = {
  time: 'time',
  mean: 'mean',
};
