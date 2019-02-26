// AccountRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";

const AccountRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
          <Sidebar>
          <Component {...matchProps} />
          </Sidebar>
      )}
    />
  );
};

export default AccountRoute;
