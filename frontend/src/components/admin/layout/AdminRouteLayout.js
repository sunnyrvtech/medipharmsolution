// AdminRouteLayout.js

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "./Layout";

const AdminRouteLayout = ({ component: Component, ...rest }) => {
  //todo: logic for validate user
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default AdminRouteLayout;