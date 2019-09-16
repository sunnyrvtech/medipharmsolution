// UserSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import User from "./User";
import UserAdd from "./UserAdd";
import UserUpdate from "./UserUpdate";
import PageNotFound from "../../PageNotFound";

const CourseSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={User} />
      <Route exact path={`${match.path}/add`} component={UserAdd} />
      <Route exact path={`${match.path}/:userId`} component={UserUpdate} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default CourseSubLayout;
