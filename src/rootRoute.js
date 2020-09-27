import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import RequirementRoute from './requirement/route';
import SprintRoute from './sprint/route';
import TaskRoute from './task/route';
import React from 'react';

const RootRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path="/requirement" component={RequirementRoute}></Route>
        <Route path="/sprint" component={SprintRoute}></Route>
        <Route path="/task" component={TaskRoute}></Route>
        <Route path="*">
          <Redirect to="/requirement" />
        </Route>
      </Switch>
    </Router>
  );
}

export default RootRoute;
