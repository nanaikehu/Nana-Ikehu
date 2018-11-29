import React from 'react';
import { Container, Grid, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {

    return (
        <Container fluid>

          <Container fluid className='landing'>
            <div className='landing-background landing1'></div>
            <div className='landing-text'>
              <h1>Nānā Ikehu</h1>
              <h2>Visualize Energy</h2>
              <div>
                <Link to='/building' activeClassName="active">View Project</Link>
              </div>
            </div>
          </Container>

          <Container fluid className='landing-about'>
            <div className='landing-background landing2'></div>
            <Grid verticalAlign='middle' columns={2} centered>
              <Grid.Row>
                <Grid.Column className='text'>
                  <h1>Welcome to</h1>
                  <h1>Nānā Ikehu</h1>
                  <p>Nānā Ikehu visualizes energy usage throughout the University of Hawaii campus through the use of
                    graphs and maps. Users are able to see the amount of energy used for each building by either
                    clicking a building on the campus map, or by selecting a building through the drop down menu.</p>
                </Grid.Column>
                <Grid.Column>
                  <Image className='image-container' size='big' src='/images/scr1.png'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

          <Container fluid className='landing-graphs'>
            <div className='landing-background landing3'></div>
            <Grid verticalAlign='middle' columns={2} centered>
              <Grid.Row>
                <Grid.Column className='graph-icons'>
                  <Icon inverted name='line graph' size='massive'/>
                  <Icon inverted name='pie graph' size='massive'/>
                  <Icon inverted name='area graph' size='massive'/>
                </Grid.Column>
                <Grid.Column className='text'>
                  <h1>Visualize Energy</h1>
                  <p>By visualizing complicated data, user are able to see just how much energy UH Manoa uses. Users are
                    able to play with a wide variety of graphs. Users are also able to view the campus data using maps.
                    By simplifying data, users are able to find a clear solution for our energy sustainability
                    problem.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

          <Container fluid className='landing-data'>
            <div className='landing-background landing4'></div>
            <Grid verticalAlign='middle' columns={2} centered>
              <Grid.Row>
                <Grid.Column className='text'>
                  <h1>Raw Data</h1>
                  <p>UH Manoa spends $30M a year on electricity. Is there a way to reduce this massive cost? To find a
                    solution, data must be collected and analyzed. Nānā Ikehu has access to this collection of data. The
                    raw data includes things such as the University of Manoa&apos;s campus building list, building
                    energy usages, energy usage through out time, and many more. </p>
                </Grid.Column>
                <Grid.Column className='image-container'>
                  <Image size='big' src='/images/scr2.png'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

        </Container>
    );
  }
}

export default Landing;
