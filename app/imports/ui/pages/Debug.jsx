import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import Papa from 'papaparse'
import { _ } from 'meteor/underscore'
import { Meteor } from "meteor/meteor";
import '../../api/building_db'
import { withTracker } from 'meteor/react-meteor-data';
import {sample} from '../../api/building_db';
import Graph1 from '../components/Graph1'

/** A simple static component to render some text for the landing page. */
class Debug extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
          <Graph1/>
    );
  }
}
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('sample');
  return {
    data: sample.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Debug);

