import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export class AllTextSum extends React.Component {

  render() {
    return (this.state.ready) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {

    return (
        <Card fluid>

        </Card>

    );
  }

}

export default withTracker(() => {

  const sub = false;
  return {
    data: 'x',
    ready: sub,
  };
})(AllTextSum);

AllTextSum.propTypes = {
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
};
AllTextSum.defaultProps = {
  dateStart: new Date('1/1/1970'),
  dateEnd: new Date(),
};
