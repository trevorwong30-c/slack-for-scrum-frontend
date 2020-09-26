import React from 'react';
import ConfirmRequirementContainer from "./containers/ConfirmRequirementContainer";
import {Route} from "react-router-dom";

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