import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer } from 'victory';
import PropTypes from 'prop-types';

export class Graph_LineBrush extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      meterId: this.props.meterId,
      zoomDomain: { x: [new Date(2018, 1, 1), new Date(2018, 2, 1)] },
    };
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.meterId !== prevProps.meterId) {
      let self = this;
      this.setState({meterId : this.props.meterId})
      this.setState({data : ''})
      Meteor.call("getMeter", this.props.meterId ,(error, response) => {
        if(error) {
          console.log('SimpleLine' + error)
        } else {
          console.log("res + for ID " + this.state.meterId)
          if(!response.length){
            response = [];
          }
          self.setState({ data : response });
        }
      });
    }
  }





  componentWillMount() {
    const self = this;
    Meteor.call("getMeter", this.state.meterId ,(error, response) => {
      if(error) {
      console.log('SimpleLine' + error)
      } else {
        console.log("res + for ID " + this.state.meterId)
        console.log(response)
        if(!response.length){
          response = [];
        }
        self.setState({ data : response });
      }
    });
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {

    return (
          <Card>
            <Card.Content>
              <div>
                <VictoryChart width={600} height={470} scale={{ x: 'time' }}
                              containerComponent={
                                <VictoryZoomContainer
                                    zoomDimension="x"
                                    zoomDomain={this.state.zoomDomain}
                                    onZoomDomainChange={this.handleZoom.bind(this)}
                                />
                              }
                >
                  <VictoryLine
                      style={{
                        data: { stroke: '#c43a31', strokeWidth: 0.2 },
                        parent: { border: '1px solid #5E7480' },
                        labels: {
                          fontSize: 50,
                        },
                      }}
                      animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                      }}
                      data={this.state.data}
                      x={this.props.x}
                      y={this.props.y}
                  />

                </VictoryChart>
                <VictoryChart
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                    width={600} height={100} scale={{ x: 'time' }}
                    containerComponent={
                      <VictoryBrushContainer
                          brushDimension="x"
                          brushDomain={this.state.zoomDomain}
                          onBrushDomainChange={this.handleZoom.bind(this)}
                      />
                    }
                >
                  <VictoryAxis
                      tickFormat={(month) => { new Date(month).getMonth(); } }
                  />
                  <VictoryLine
                      style={{
                        data: { stroke: '#c43a31', strokeWidth: 0.2 },
                        parent: { border: '1px solid #5E7480' },
                        labels: {
                          fontSize: 50,
                        },
                      }}
                      animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                      }}
                      data={this.state.data}
                      x={this.props.x}
                      y={this.props.y}
                  />
                </VictoryChart>
              </div>
            </Card.Content>
          </Card>
    );
  }
}
Graph_LineBrush.propTypes = {
  meterId: PropTypes.number.isRequired,
  x: PropTypes.string,
  y: PropTypes.string,
};
Graph_LineBrush.defaultProps = {
  x: 'x',
  y: 'y',
};