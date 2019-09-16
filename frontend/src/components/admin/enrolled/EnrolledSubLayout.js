// EnrolledSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Enrolled from "./Enrolled";
import EnrolledAdd from "./EnrolledAdd";
import EnrolledUpdate from "./EnrolledUpdate";
import Certificate from "./Certificate";
import PageNotFound from "../../PageNotFound";

const EnrolledSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Enrolled} />
      <Route exact path={`${match.path}/add/:enrollmentId`} component={EnrolledAdd} />
      <Route exact path={`${match.path}/certificate/:enrolledId`} component={Certificate} />
      <Route exact path={`${match.path}/:enrolledId`} component={EnrolledUpdate} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default EnrolledSubLayout;
