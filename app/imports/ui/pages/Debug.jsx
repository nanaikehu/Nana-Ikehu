import React from 'react';
import { Loader } from 'semantic-ui-react';
import { Meteor, sample } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import '../../api/building_db';

/** A simple static component to render some text for the landing page. */
class Debug extends React.Component {
  render() {
    return (this.state.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
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
