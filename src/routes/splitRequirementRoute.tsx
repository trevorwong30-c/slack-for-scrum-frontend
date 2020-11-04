import React from 'react';
import SplitRequirementContainer from '../containers/requirement/splitRequirementContainer/SplitRequirementContainer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const SplitRequirementRoute = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <SplitRequirementContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default SplitRequirementRoute;
