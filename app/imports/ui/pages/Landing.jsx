import React from 'react';
import { Card, Container, Header, Dropdown, Menu, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Graph_SimpleLine } from '../components/Graph_SimpleLine';
import { Graph_SimpleLine2 } from '../components/Graph_SimpleLine2';
import { Graph1 } from '../components/Graph1';
import { Graph_HorizontalLine } from '../components/Graph_HorizontalLine';

const options = [
  { key: 1, text: 'Jan', value: new Date(2018, 0) },
  { key: 2, text: 'Feb', value: new Date(2018, 1) },
  { key: 3, text: 'Mar', value: new Date(2018, 2) },
]

// const start = new Date(2018, 0);
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: '',
      start: new Date(),
      end: new Date(2018, 2),
      // time: ,
      // mean: ,
      // month: 0,
    };
  }
  handleData = () => {
    Meteor.call('getMeterbyDate', 5, this.state.start, this.state.end, (error, response) => {
      if (error) {
        console.log('SimpleLine' + error);
      } else {
        console.log('res+ ')
        console.log(response)
        this.setState({ data: response });
      }
    });
  }
  componentWillMount() {
    Meteor.call('getMeterbyDate', 5, this.state.start, this.state.end, (error, response) => {
      if (error) {
        console.log('SimpleLine' + error);
      } else {
        console.log('res+ ')
        console.log(response)
        this.setState({ data: response });
      }
    });
  }
  // render() {
  //   return (this.state.data) ? this.renderPage() : <Loader active>Getting data</Loader>;
  // }

  render() {
    console.log(this.state.start);
    console.log(this.state.end);
    return (
    <Container fluid>
          <Dropdown
              options={options}
              text='Text'
              simple
              item
              onChange={ (event, data) => {
                console.log(data.value);
                console.log(this.state.start);
                this.setState({ data: this.handleData(), start: data.value });
                // this.setState({ data: this.handleData() });
                }
              }
          />
          <Header inverted textAlign={'center'} as='h2'>Energy Dashboard</Header>
          <Card.Group itemsPerRow={2}>
            {/* <Graph1 meterId={5} x={'time'} y={'mean'}/> */}
            <Graph_SimpleLine
                meterId={5}
                x={'time'}
                y={'mean'}
                // data={ this.state.data }
            />
            <Graph_SimpleLine2
                meterId={5}
                start={ this.state.start }
                end={ this.state.end }
                x={'time'}
                y={'mean'}
                data={ this.state.data }
            />
            {/*<Graph_HorizontalLine meterId={5} time={'time'} min={'min'} max={'max'} mean={'mean'}/>*/}
          </Card.Group>
        </Container>

    );
  }
}

export default Landing;
