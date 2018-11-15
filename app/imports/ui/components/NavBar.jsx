import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Container, Image, Header, Grid } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px', backgroundColor: '#383b4a' };
    const itemStyle = { fontSize: '20px', color: 'white' };
    return (
        <Menu borderless fluid className="topmenu" style={menuStyle}>
          <Container>
            <Grid centered>
              <Menu.Item><Image size='tiny' src="/images/nana.png"/></Menu.Item>
              <Menu.Item as={NavLink} activeClassName="" exact to="/">
                <Header inverted as='h1'>Nana Ikehu</Header>
            </Menu.Item>
            </Grid>
            <Menu.Item style={itemStyle} position="right" as={NavLink}
                       activeClassName="active" exact to="/sumdate" key='upload'>Summary</Menu.Item>
            <Menu.Item style={itemStyle} as={NavLink}
                       activeClassName="active" exact to="/building" key='upload'>Buildings</Menu.Item>
            <Menu.Item style={itemStyle} as={NavLink}
                       activeClassName="active" exact to="/map" key='upload'>Map</Menu.Item>
          </Container>

        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
