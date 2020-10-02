import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import RequirementRoute from './routes/requirementRoute';
import SprintRoute from './routes/sprintRoute';
import TaskRoute from './routes/taskRoute';
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
};

export default RootRoute;
