import React from 'react';
import { Image } from 'semantic-ui-react';



/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {



  render() {

    return (
        <Image src={'/images/landing.jpg'} fluid/>

    );
  }
}

export default Landing;
