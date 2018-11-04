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
  componentWillMount() {
    const self = this;
    Meteor.call('getMeterbyDate', this.props.meterId, this.props.start, this.props.end, (error, response) => {
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
    // console.log(this.state.data.SampleTsUtc);
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
Graph_SimpleLine2.propTypes = {
  meterId: PropTypes.number.isRequired,
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  time: PropTypes.string,
  mean: PropTypes.string,
};
Graph_SimpleLine2.defaultProps = {
  time: 'time',
  mean: 'mean',
};
