// EnrolledSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Enrolled from "./Enrolled";
import EnrolledAdd from "./EnrolledAdd";
import EnrolledUpdate from "./EnrolledUpdate";
import PageNotFound from "../../PageNotFound";

const EnrolledSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Enrolled} />
      <Route exact path={`${match.path}/:enrolledId`} component={EnrolledUpdate} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default EnrolledSubLayout;
