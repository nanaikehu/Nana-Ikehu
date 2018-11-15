import React from 'react';
import { Image, Container, Icon } from 'semantic-ui-react';



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
              <h1>Welcome to</h1>
              <h1>Nānā Ikehu</h1>
              <p>Nānā Ikehu visualizes energy usage throughout the University of Hawaii campus through the use of graphs and maps. Users are able to see the amount of energy used for each building by either clicking a building on the campus map, or by selecting a building through the drop down menu.</p>
            </div>
            <Image size='big' floated='right' src='/images/scr1.png' />
          </div>
          <div className='landing-graphs'>
            <div className='text'>
              <h1>Visualize Energy</h1>
              <p>This app visualizes energy usage throughout the University of Hawaii campus through the use of graphs and maps. Users are able to see the amount of energy used for each building by either clicking a building on the campus map, or by selecting a building through the drop down menu.</p>
            </div>
            <div className='graph-icons'>
              <Icon inverted name='line graph' size='massive' />
              <Icon inverted name='pie graph' size='massive' />
              <Icon inverted name='area graph' size='massive' />
            </div>div
          </div>
          <div className='landing-about'>
            <div className='text'>
              <h1>Welcome to</h1>
              <h1>Nānā Ikehu</h1>
              <p>Nānā Ikehu visualizes energy usage throughout the University of Hawaii campus through the use of graphs and maps. Users are able to see the amount of energy used for each building by either clicking a building on the campus map, or by selecting a building through the drop down menu.</p>
            </div>
            <Image size='big' floated='right' src='/images/scr2.png' />
          </div>
        </Container>

    );
  }
}

export default Landing;
