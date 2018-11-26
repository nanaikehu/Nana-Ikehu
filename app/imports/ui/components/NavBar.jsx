import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Container, Image, Header, Grid } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {

    const menuStyle = { fontFamily: 'Montserrat', backgroundColor: '#383b4a', marginBottom: '0px'};
    const itemStyle = { fontSize: '1.2rem', color: 'white', paddingTop: '0px', paddingBottom: '0px'};

    return (
        <Menu borderless fluid className="topmenu" style={ menuStyle }>
          <Container>
            <Menu.Item style={{ paddingTop: '0px', paddingBottom: '0px' }}><Image size='tiny' src="/images/nana.png"/></Menu.Item>
            <Menu.Item style={{ paddingTop: '0px', paddingBottom: '0px' }} position="left" as={NavLink} activeClassName="" exact to="/">
              <Header style={{ fontFamily: 'Montserrat'}}  inverted as='h1'>Nānā Ikehu</Header>
            </Menu.Item>
            <Menu.Item style={itemStyle} position="right" as={NavLink} activeClassName="active" exact to="/sumdate" key='upload'>Summary</Menu.Item>
            <Menu.Item style={itemStyle} as={NavLink} activeClassName="active" exact to="/building" key='upload'>Buildings</Menu.Item>
            <Menu.Item style={itemStyle}  as={NavLink} activeClassName="active" exact to="/map" key='upload'>Map</Menu.Item>
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
