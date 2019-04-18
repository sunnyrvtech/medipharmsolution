// SettingSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Setting from "./Setting";
import HomeSetting from "./HomeSetting";
import PageNotFound from "../../PageNotFound";

const SettingSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={Setting} />
      <Route exact path={`${match.path}/:slug`} component={HomeSetting} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default SettingSubLayout;
