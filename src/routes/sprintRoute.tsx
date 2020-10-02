import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const SprintRoute = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <div>Sprint!</div>
        </Route>
      </Switch>
    </div>
  );
};

export default SprintRoute;
