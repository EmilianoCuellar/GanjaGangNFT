// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About'; // Import other components as needed

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/About" component={About} /> {/* Add this line */}
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default Routes;
