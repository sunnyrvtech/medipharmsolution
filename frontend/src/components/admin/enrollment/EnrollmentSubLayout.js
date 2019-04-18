// EnrollmentSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Enrollment from "./Enrollment";
import EnrolledAdd from "../enrolled/EnrolledAdd";
import PageNotFound from "../../PageNotFound";

const EnrollmentSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Enrollment} />
      <Route exact path={`${match.path}/add/:enrollmentId`} component={EnrolledAdd} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default EnrollmentSubLayout;
