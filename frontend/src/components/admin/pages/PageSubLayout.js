// PageSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Page from "./Page";
import PageAdd from "./PageAdd";
import PageUpdate from "./PageUpdate";
import PageNotFound from "../../PageNotFound";

const PageSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Page} />
      <Route exact path={`${match.path}/add`} component={PageAdd} />
      <Route exact path={`${match.path}/:pageId`} component={PageUpdate} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default PageSubLayout;
