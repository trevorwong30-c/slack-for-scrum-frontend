import React from 'react';
import TaskListContainer from '../containers/task/taskListContainer/TaskListContainer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

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
};

export default TaskRoute;
