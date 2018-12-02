import React from 'react';
import { Button, Card, Container, Dropdown, Grid, Icon, Loader, Segment, Menu, Sidebar } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-date-picker';
import PropTypes from 'prop-types';
import { Graph_LineBrush } from '../components/Graph_LineBrush';
import MeterTextSum from '../components/MeterTextSum';
import { Link } from 'react-router-dom';

export default class SideBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

    this.handleHideClick = () => this.setState({ visible: false })
    this.handleShowClick = () => this.setState({ visible: true })
    this.handleSidebarHide = () => this.setState({ visible: false })
  }

  render() {
    const { visible } = this.state

    return (
        <div>
          <Button disabled={visible} onClick={this.handleShowClick}>
            <Icon name='sidebar'></Icon>
          </Button>

          <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={this.handleSidebarHide}
                vertical
                visible={visible}
                width='thin'
            >
              <Menu.Item as='a'>
                <Icon name='home' />
                <Link to='/' activeClassName="active">Home</Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='building outline' />
                <Link to='/building' activeClassName="active">Building</Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='map outline' />
                <Link to='/map' activeClassName="active">Map</Link>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
    )
  }
}