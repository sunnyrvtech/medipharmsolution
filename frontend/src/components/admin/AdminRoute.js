// AdminRoute.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PageNotFound from "../PageNotFound";
import CourseSubLayout from "./courses/CourseSubLayout";
import UserSubLayout from "./users/UserSubLayout";
import AdminRouteLayout from "./layout/AdminRouteLayout";
import RouteLayout from "../layout/RouteLayout";
import jwt_decode from "jwt-decode";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
let isAdmin = false;
if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  if (decoded.role == 1) {
    isAdmin = true;
  }
}

const AdminRoute = ({ match }) => {
  return isAdmin === true ? (
    <Switch>
      <AdminRouteLayout exact path={match.path} component={Dashboard} />
      <AdminRouteLayout path={`${match.path}/users`} component={UserSubLayout} />
      <AdminRouteLayout path={`${match.path}/courses`} component={CourseSubLayout} />
      <AdminRouteLayout component={PageNotFound} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path={match.path} component={Login} />
      <RouteLayout component={PageNotFound} />
    </Switch>

  );
};

export default AdminRoute;
