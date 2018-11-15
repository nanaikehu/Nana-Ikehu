import React from 'react';
import { Image, Container } from 'semantic-ui-react';



/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {



  render() {

    return (
        <Container fluid>
          {/*<Image src='/images/landing.jpg' className='landing-background'/>*/}
          <div className='landing'>
            <div className='landing-background'></div>
            <div className='landing-text'>
              <h1>Nānā Ikehu</h1>
              <h2>Visualize Energy</h2>
              <div>
                <a href='#'>View Project</a>
              </div>
            </div>
          </div>
          <div className='landing-about'>
            <div className='text'>
              <h1>Welcome to Nānā Ikehu</h1>
              <p>Nānā Ikehu visualizes energy usage throughout the University of Hawaii campus through the use of graphs and maps. Users are able to see the amount of energy used for each building by either clicking a building on the campus map, or by selecting a building through the drop down menu.</p>
            </div>
          </div>
          <div className='landing-data'>
            <div className='text'>
              <h1>Welcome to Nānā Ikehu</h1>
              <p>This app visualizes energy usage throughout the University of Hawaii campus through the use of graphs and maps. Users are able to see the amount of energy used for each building by either clicking a building on the campus map, or by selecting a building through the drop down menu.</p>
            </div>
          </div>
        </Container>

    );
  }
}

export default Landing;
