import React from 'react';
import { Image, Container } from 'semantic-ui-react';



/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {



  render() {

    return (
        <Container fluid>
          <Image src='/images/landing.jpg' className='landing-background'/>
          <div className='landing-text'>
            <h1>Nānā Ikehu</h1>
            <h2>Visualize Energy</h2>
            <div>
              <a href='#'>View Project</a>
            </div>
          </div>
        </Container>

    );
  }
}

export default Landing;
