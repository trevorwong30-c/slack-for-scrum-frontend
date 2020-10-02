import React from 'react';
import ConfirmRequirementContainer from '../containers/requirement/confirmRequirementContainer/ConfirmRequirementContainer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const RequirementRoute = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <ConfirmRequirementContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default RequirementRoute;
