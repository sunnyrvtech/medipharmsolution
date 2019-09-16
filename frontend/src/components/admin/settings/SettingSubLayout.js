// SettingSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import SettingList from "./SettingList";
import Setting from "./Setting";
import PageNotFound from "../../PageNotFound";

const SettingSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={SettingList} />
      <Route exact path={`${match.path}/:slug`} component={Setting} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default SettingSubLayout;
