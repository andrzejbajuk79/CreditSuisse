import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {GLOBAL_ROUTES} from './constans/routerConfig';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
 render() {
  const routeComponents = GLOBAL_ROUTES.map(
   ({Component, path, ...props}, key) => (
    <Route
     key={key}
     exact={path === '/'}
     path={path}
     render={() => <Component {...props} />}
    />
   )
  );

  return (
   <Router>
    <Switch>{routeComponents}</Switch>
   </Router>
  );
 }
}

export default App;
