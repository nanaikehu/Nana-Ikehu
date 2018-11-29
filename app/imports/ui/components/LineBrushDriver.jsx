import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Graph_LineBrushAll } from './Graph_LineBrushAll';

export default class LineBrushDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd) {
      const self = this;
      this.setState({ data: '' });
      Meteor.call('sumHourly', new Date(this.props.dateStart), new Date(this.props.dateEnd), (error, response) => {
        if (error) {
          // console.log(`SimpleLine, ${error}`);
        } else {
          self.setState({ data: response });
        }
      });
    }
  }


  componentWillMount() {
    const self = this;
    Meteor.call('sumHourly', new Date(this.props.dateStart), new Date(this.props.dateEnd), (error, response) => {
      if (error) {
        // console.log(`SimpleLine, ${error}`);
      } else {

        self.setState({ data: response });
      }
    });
  }

  render() {
    return (!_.isEmpty(this.state.data)) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }


  renderGraph() {
    return (
        <Card fluid>
          <Card.Content>
            <Graph_LineBrushAll data={this.state.data} x={'name'} y={'sum'}
                                dateStart={this.props.dateStart} dateEnd={this.props.dateEnd}/>
          </Card.Content>
        </Card>

    );
  }

}

LineBrushDriver.propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

LineBrushDriver.defaultProps = {
  dateStart: new Date('5/1/2018'),
  dateEnd: new Date(),
};
