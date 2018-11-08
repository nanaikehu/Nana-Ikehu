import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer } from 'victory';
import PropTypes from 'prop-types';




export class Graph_LineBrushAll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      zoomDomain: { x: [new Date(this.props.dateStart), new Date(this.props.dateEnd)] },
    };
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleZoom = this.handleZoom.bind(this)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd ) {
      this.setState({zoomDomain: { x: [new Date(this.props.dateStart), new Date(this.props.dateEnd)]}})
    }
  }


  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (this.props.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {
console.log(this.props.data)
    return (
            <Card.Content>
                <VictoryChart height={410} scale={{ x: 'time' }}
                              containerComponent={
                                <VictoryZoomContainer
                                    zoomDimension="x"
                                    zoomDomain={this.state.zoomDomain}
                                    onZoomDomainChange={this.handleZoom.bind(this)}
                                />
                              }
                >
                  <VictoryAxis
                      fixLabelOverlap={true}
                  />
                  <VictoryAxis dependentAxis crossAxis
                               standalone={false}
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
                        onLoad: { duration: 1000 }
                      }}
                      data={this.props.data}
                      x={this.props.x}
                      y={this.props.y}
                  />

                </VictoryChart>
                <VictoryChart
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                     height={100} scale={{ x: 'time' }}
                    containerComponent={
                      <VictoryBrushContainer
                          brushDimension="x"
                          brushDomain={this.state.zoomDomain}
                          onBrushDomainChange={this.handleZoom.bind(this)}
                      />
                    }
                >
                  <VictoryAxis
                      fixLabelOverlap={true}
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
                      data={this.props.data }
                      x={this.props.x}
                      y={this.props.y}
                  />
                </VictoryChart>
            </Card.Content>
    );
  }
}
Graph_LineBrushAll.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.string,
  y: PropTypes.string,
};
Graph_LineBrushAll.defaultProps = {
  x: 'x',
  y: 'y',
};