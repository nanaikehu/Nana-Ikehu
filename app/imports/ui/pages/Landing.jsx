import React from 'react';
import { Image, Container, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {

    return (
        <Container fluid>
          {/* <Image src='/images/landing.jpg' className='landing-background'/> */}
          <div className='landing'>
            <div className='landing-background landing1'></div>
            <div className='landing-text'>
              <h1>Nānā Ikehu</h1>
              <h2>Visualize Energy</h2>
              <div>
                <a href='#'>View Project</a>
              </div>
            </div>
          </div>
          <div className='landing-about'>
            <div className='landing-background landing2'></div>
            <div className='text'>
              <h1>Welcome to</h1>
              <h1>Nānā Ikehu</h1>
              <p>Nānā Ikehu visualizes energy usage throughout the University of Hawaii campus through the use of graphs
                and maps. Users are able to see the amount of energy used for each building by either clicking a
                building on the campus map, or by selecting a building through the drop down menu.</p>
            </div>
            <Container className='image-container'>
              <Image size='big' src='/images/scr1.png'/>
            </Container>
          </div>
          <div className='landing-graphs'>
            <div className='landing-background landing3'></div>
            <div className='text'>
              <h1>Visualize Energy</h1>
              <p>By visualizing complicated data, user are able to see just how much energy UH Manoa uses. Users are
                able to play with a wide variety of graphs. Users are also able to view the campus data using maps. By
                simplifying data, users are able to find a clear solution for our energy sustainability problem.</p>
            </div>
            <div className='graph-icons'>
              <Icon inverted name='line graph' size='massive'/>
              <Icon inverted name='pie graph' size='massive'/>
              <Icon inverted name='area graph' size='massive'/>
            </div>
            div
          </div>
          <div className='landing-data'>
            <div className='landing-background landing4'></div>
            <div className='text'>
              <h1>Raw Data</h1>
              <p>UH Manoa spends $30M a year on electricity. Is there a way to reduce this massive cost? To find a
                solution, data must be collected and analyzed. Nānā Ikehu has access to this collection of data. The raw
                data includes things such as the University of Manoa&apos;s campus building list, building energy
                usages,
                energy usage through out time, and many more. </p>
            </div>
            <Container className='image-container'>
              <Image size='big' src='/images/scr2.png'/>
            </Container>
          </div>
        </Container>

    );
  }
}

export default Landing;
