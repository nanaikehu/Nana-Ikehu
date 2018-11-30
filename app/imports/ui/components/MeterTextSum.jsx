import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

export default class MeterTextSum extends React.Component {
  constructor(props) {
    super(props);
  this.state = { data: '' };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.meterId !== prevProps.meterId ||
        this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd) {
      const self = this;
      this.setState({ meterId: this.props.meterId });
      this.setState({ data: '' });
      Meteor.call('getMeterbyDate', this.props.meterId,
          new Date(this.props.dateStart), new Date(this.props.dateEnd), (error, response) => {
        if (error) {
          // console.log(`SimpleLine${error}`);
        } else {
          // console.log(`res + for ID ${this.state.meterId}`);
          if (!response.length) {
            response = [];
          }

          // console.log(response);

          self.setState({ data: response });
        }
      });
    }
  }


  componentWillMount() {
    const self = this;
    Meteor.call('getMeterbyDate', this.props.meterId,
        new Date(this.props.dateStart), new Date(this.props.dateEnd), (error, response) => {
      if (error) {
        // console.log(`SimpleLine${error}`);
      } else {
        // console.log(`res + for ID ${this.state.meterId}`);
        // console.log(response);
        if (!response.length) {
          response = [];
        }

        // console.log(response);
        self.setState({ data: response });
      }
    });
  }

  render() {
    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }


  renderGraph() {
    const data = this.state.data;
    const maxPoint = _.max(data, entry => entry.max);
    const highlight = {
      backgroundColor: '#CCFF00', color: 'black',
      paddingLeft: '0.5rem', paddingRight: '0.5rem', borderRadius: '0.5rem'
    };
    let sumPoint = _.pluck(data, 'mean');
    sumPoint = sumPoint.reduce((total, val) => total + val);

    return (
        <Card fluid style={{ maxHeight: '4rem', color: '#fff', backgroundColor: '#383b4a', border: 'none' }}>
          <Card.Content style={{ textAlign: 'center', border: 'none' }}>
            Max point: <span style={ highlight }>{`${maxPoint.max} ${this.props.unit}`}</span> on <span style={highlight}>{maxPoint.time.toLocaleString()}</span><br/>
            Summation: <span style={highlight}>{`${sumPoint.toFixed(2)} ${this.props.unit}`}</span><br/>
          </Card.Content>
        </Card>
    );
  }

}

MeterTextSum.propTypes = {
    meterId: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
};
MeterTextSum.defaultProps = {
  dateStart: new Date('1/1/1970'),
  dateEnd: new Date(),
};
