import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryPie } from 'victory';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

const style = { fontFamily: 'Nunito Sans Light', backgroundColor: 'gray', color: 'white' };

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
export class Graph1 extends React.Component {

  constructor(props) {
    super(props)
    this.state = { data: '' };

  }
  componentWillMount() {
    const self = this;
    Meteor.call('getMeter', this.props.meterId ,(error, response) => {
      if (error) {
        console.log('Graph1' + error);
      } else {
        console.log('res+ ')
        console.log(response)
        self.setState({ data: response });
      }
    });
  }

  // For displaying percentages in the pie chart.
  getPercent = (num) => {
    const arr = this.state.data.map(i => i.y);
    return ((num / arr.reduce((accumulator, currentValue) => accumulator + currentValue)) * 100).toFixed(1);
  };


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
              <svg viewBox='0 0 400 400'>
                <VictoryPie
                    standalone={false}
                    width={400} height={400}
                    labelRadius={100}
                    colorScale={['#51BCCD', '#F5B14F', '#6AD1A4', '#BDDA6D', '#F18F4C', '#EDD85F']}
                    style={{ data: { stroke: '#5E7480', strokeWidth: 3 }, labels: { fontSize: 12, fill: '#5E7480' } }}
                    labels={(d) => `${this.getPercent(d.y)}%`}
                    data={this.state.data}
                    x={this.props.x}
                    y={this.props.y}
                />
              </svg>
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}

Graph1.propTypes = {
  meterId: PropTypes.number.isRequired,
  x: PropTypes.string,
  y: PropTypes.string,
};
Graph1.defaultProps = {
  x: 'x',
  y: 'y',
};