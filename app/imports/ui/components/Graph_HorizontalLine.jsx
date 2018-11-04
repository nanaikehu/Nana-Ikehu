import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryGroup, VictoryZoomContainer } from 'victory';
import PropTypes from 'prop-types';

const style = { fontFamily: 'Nunito Sans Light', backgroundColor: 'gray', color: 'white' };

export class Graph_HorizontalLine extends React.Component {

  constructor(props) {
    super(props)
    this.state = { data: '' };

  }
  componentWillMount() {
    const self = this;
    Meteor.call('getMeter', this.props.meterId ,(error, response) => {
      if (error) {
      console.log('HorizontalLine' + error);
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
    return (
        <Card>
          <Card.Content>
            <Card.Content>
              <Card.Header style={style} textAlign={'center'}>Recent Activity</Card.Header>
              <hr/>
            </Card.Content>
            <Card.Content>
              <div>
                <VictoryChart
                    theme={VictoryTheme.material}
                    scale={{ x: 'time' }}
                    containerComponent={
                      <VictoryZoomContainer zoomDimension='y'/>
                    }
                >
                  <VictoryGroup
                      style={{ data: { width: 6 } }}
                      colorScale={['brown', 'tomato', 'gold']}
                  >
                    <VictoryBar
                        data={this.state.data}
                        x={this.props.min}
                        y={this.props.time}
                    />
                    {/*<VictoryBar*/}
                        {/*data={this.state.data}*/}
                        {/*x={this.props.max}*/}
                        {/*y={this.props.time}*/}
                    {/*/>*/}
                    {/*<VictoryBar*/}
                        {/*data={this.state.data}*/}
                        {/*x={this.props.mean}*/}
                        {/*y={this.props.time}*/}
                    {/*/>*/}
                  </VictoryGroup>
                </VictoryChart>
              </div>
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}
Graph_HorizontalLine.propTypes = {
  meterId: PropTypes.number.isRequired,
  time: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  mean: PropTypes.string,
};
Graph_HorizontalLine.defaultProps = {
  time: 'time',
  min: 'min',
  max: 'max',
  mean: 'mean',
};
