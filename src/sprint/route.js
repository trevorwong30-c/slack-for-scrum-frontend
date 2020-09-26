import React from 'react';
import { Route } from "react-router-dom";
import "./style.scss";

const SprintRoute = () => {

  return (
    <>
      <Route exact path="/sprint">
        <div>Sprint!</div>
      </Route>
    </>
  );

}

export default SprintRoute;
