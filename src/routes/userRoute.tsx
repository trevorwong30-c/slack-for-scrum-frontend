import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserListContainer from "../containers/user/userListContainer/UserListContainer";

const UserRoute = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <UserListContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default UserRoute;
