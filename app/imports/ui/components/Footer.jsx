import React from 'react';
import { Grid } from 'semantic-ui-react';


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr/>
            <Grid container stackable centered columns={3} className='bottomgrid'>

              <Grid.Column textAlign='center'>
                <p>ABOUT US</p><br/>
                <p><a href='#'>{'Learn More'}</a></p>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <p>CAREERS</p><br/>
                <p><a href='#'>Learn more</a></p>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <p>CONTACT US</p><br/>
                <p><a href='#'>Learn more</a></p>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
