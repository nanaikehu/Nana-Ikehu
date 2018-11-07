import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer  } from 'victory';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

export class Graph_SimpleLine extends React.Component {

  constructor (props) {
    super(props)
    this.state = { data : '', meterId: this.props.meterId };
    this.componentDidUpdate = this.componentDidUpdate.bind(this)

  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.meterId !== prevProps.meterId || this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd ) {
      let self = this;
      this.setState({meterId : this.props.meterId})
      this.setState({data : ''})
      Meteor.call("getMeterbyDate", this.props.meterId , new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
        if(error) {
          console.log('SimpleLine' + error)
        } else {
          console.log("res + for ID " + this.state.meterId)
          if(!response.length){
            response = [];
          }

          console.log(response)

          self.setState({ data : response });
        }
      });
    }
  }





  componentWillMount() {
    const self = this;
    Meteor.call("getMeterbyDate", this.props.meterId , new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
      if(error) {
      console.log('SimpleLine' + error)
      } else {
        console.log("res + for ID " + this.state.meterId)
        console.log(response)
        if(!response.length){
          response = [];
        }



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
          <Card fluid>
            <Card.Content>
              <VictoryChart
                  theme={VictoryTheme.material}
                  scale={{x : 'time'}}
                  containerComponent={
                    <VictoryZoomContainer zoomDimension="x"/>
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
            </Card.Content>
          </Card>
    );
  }
}
Graph_SimpleLine.propTypes = {
  meterId: PropTypes.number.isRequired,
  x: PropTypes.string,
  y: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string
};
Graph_SimpleLine.defaultProps = {
  x: 'x',
  y: 'y',
  dateStart: new Date('1/1/1970'),
  dateEnd: new Date()
};