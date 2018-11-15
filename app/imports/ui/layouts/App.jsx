import React from 'react';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Upload from '../pages/Upload';
import Debug from '../pages/Debug';
import Building from '../pages/Building';
import ListMap from '../pages/ListMap';
import SumDate from '../pages/SumDate';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div className='app'>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/upload" component={Upload}/>
              <Route path="/debug" component={Debug}/>
              <Route exact path="/building" component={Building}/>
              <Route path="/building/:code" component={Building}/>
              <Route path="/map" component={ListMap}/>
              <Route path="/sumdate" component={SumDate}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
