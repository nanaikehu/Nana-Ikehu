import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer } from 'victory';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Graph_LineBrush } from './Graph_LineBrush';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";

export class AllTextSum extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (this.state.ready) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }


  renderGraph() {

    return(
        <Card fluid>

        </Card>

    )
  }

}
export default withTracker(() => {
  this
 const sub = false;
  return {
    data: ,
    ready: sub,
  };
})(AllTextSum);

AllTextSum.propTypes = {
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string
};
AllTextSum.defaultProps = {
  dateStart: new Date('1/1/1970'),
  dateEnd: new Date()
};