import React from 'react';
import TaskListContainer from "./containers/TaskListContainer";
import { Route } from "react-router-dom";
import "./style.scss";

const TaskRoute = () => {

  return (
    <>
      <Route exact path="/task">
        <TaskListContainer />
      </Route>
    </>
  );

}

export default TaskRoute;
