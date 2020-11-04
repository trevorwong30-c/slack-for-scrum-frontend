import React from 'react';
import ScrumBoardContainer from "../containers/scrum/ScrumBoardContainer"
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const ScrumBoardRoute = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <ScrumBoardContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default ScrumBoardRoute;
