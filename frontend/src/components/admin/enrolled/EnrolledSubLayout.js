// EnrolledSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Enrolled from "./Enrolled";
import EnrolledAdd from "./EnrolledAdd";
import PageNotFound from "../../PageNotFound";

const EnrolledSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Enrolled} />
      <Route exact path={`${match.path}/add`} component={EnrolledAdd} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default EnrolledSubLayout;
