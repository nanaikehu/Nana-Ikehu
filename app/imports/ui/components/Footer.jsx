import React from 'react';
import { Grid } from 'semantic-ui-react';


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: '#C2C4C5', backgroundColor: '#383b4a', display: 'inline-block' };
    return (
        <footer className='footer'>
          <div style={divStyle} className="ui center aligned fluid container">
            <hr />
            Department of Information and Computer Sciences <br />
            University of Hawaii<br />
            Honolulu, HI 96822
          </div>
        </footer>
    );
  }
}

export default Footer;
