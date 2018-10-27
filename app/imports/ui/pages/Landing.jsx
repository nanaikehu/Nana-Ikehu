import React from 'react';
import { Card, Container, Header } from 'semantic-ui-react';
import Graph1 from '../components/Graph1';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container fluid>
          <Header inverted textAlign={'center'} as='h2'>Energy Dashboard</Header>
          <Card.Group itemsPerRow={2}>
            <Graph1/>
            <Graph1/>
            <Graph1/>
            <Graph1/>
          </Card.Group>
        </Container>
    );
  }
}

export default Landing;
