import React from 'react';
import { Card, Container, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Graph_SimpleLine } from '../components/Graph_SimpleLine';
import { Graph_SimpleLine2 } from '../components/Graph_SimpleLine2';
import { Graph1 } from '../components/Graph1';
import { Graph_HorizontalLine } from '../components/Graph_HorizontalLine';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container fluid>
          <Header inverted textAlign={'center'} as='h2'>Energy Dashboard</Header>
          <Card.Group itemsPerRow={2}>
            {/* <Graph1 meterId={5} x={'time'} y={'mean'}/> */}
            <Graph_SimpleLine meterId={5} x={'time'} y={'mean'}/>
            <Graph_SimpleLine2 meterId={5} start={new Date(2018, 1, 13, 1, 0, 0, 0)} end={new Date(2018, 1, 13, 23, 0, 0, 0)} x={'time'} y={'mean'}/>
            {/*<Graph_HorizontalLine meterId={5} time={'time'} min={'min'} max={'max'} mean={'mean'}/>*/}
          </Card.Group>
        </Container>

    );
  }
}

export default Landing;
