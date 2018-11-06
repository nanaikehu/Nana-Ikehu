import React from 'react';
import { Card, Container, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Graph_SimpleLine } from '../components/Graph_SimpleLine';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className = 'landing-background'>

        <Container fluid>
          <Header inverted textAlign={'center'} as='h2'>Energy Dashboard</Header>
          <Graph_SimpleLine meterId={5} x={'time'} y={'mean'}/>
        <Card.Group itemsPerRow={2}>
          <Graph1/>
        </Card.Group>
        </Container>
        </div>
    );
  }
}

export default Landing;
