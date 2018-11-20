import React from 'react';
import { Card } from 'semantic-ui-react';
import Map1 from '../components/Map';

/** A simple static component to render some text for the landing page. */
class ListMap extends React.Component {

  render() {

    return (
        <Card.Group itemsPerRow={1} style={{ paddingTop: '10px' }}>
          <Map1/>
        </Card.Group>
    );
  }
}

export default ListMap;
