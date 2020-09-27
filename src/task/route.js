import React from 'react';
import TaskListContainer from "./containers/TaskListContainer";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import "./style.scss";

const TaskRoute = () => {

  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <TaskListContainer />
        </Route>
      </Switch>
    </div>
  );

}

export default TaskRoute;
