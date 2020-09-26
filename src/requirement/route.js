import React from 'react';
import ConfirmRequirementContainer from "./containers/ConfirmRequirementContainer";
import { Route } from "react-router-dom";
import "./style.scss";

const RequirementRoute = () => {

  return (
    <>
      <Route path="/">
        <ConfirmRequirementContainer />
      </Route>
    </>
  );

}

export default RequirementRoute;
