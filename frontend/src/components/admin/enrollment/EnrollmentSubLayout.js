// EnrollmentSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Enrollment from "./Enrollment";
import PageNotFound from "../../PageNotFound";

const EnrollmentSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Enrollment} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default EnrollmentSubLayout;
