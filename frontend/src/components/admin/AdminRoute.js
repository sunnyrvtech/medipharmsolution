// AdminRoute.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PageNotFound from "../PageNotFound";
import CategorySubLayout from "./category/CategorySubLayout";
import CourseSubLayout from "./courses/CourseSubLayout";
import UserSubLayout from "./users/UserSubLayout";
import PageSubLayout from "./pages/PageSubLayout";
import SettingSubLayout from "./settings/SettingSubLayout";
import MediaSubLayout from "./gallery/MediaSubLayout";
import BlogSubLayout from "./blog/BlogSubLayout";
import EnrollmentSubLayout from "./enrollment/EnrollmentSubLayout";
import EnrolledSubLayout from "./enrolled/EnrolledSubLayout";
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
      <AdminRouteLayout path={`${match.path}/media/gallery`} component={MediaSubLayout} />
      <AdminRouteLayout path={`${match.path}/blogs`} component={BlogSubLayout} />
      <AdminRouteLayout path={`${match.path}/categories`} component={CategorySubLayout} />
      <AdminRouteLayout path={`${match.path}/users`} component={UserSubLayout} />
      <AdminRouteLayout path={`${match.path}/courses`} component={CourseSubLayout} />
      <AdminRouteLayout path={`${match.path}/enrollments`} component={EnrollmentSubLayout} />
      <AdminRouteLayout path={`${match.path}/enrolled/users`} component={EnrolledSubLayout} />
      <AdminRouteLayout path={`${match.path}/settings`} component={SettingSubLayout} />
      <AdminRouteLayout path={`${match.path}/static/pages`} component={PageSubLayout} />
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
