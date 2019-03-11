// BlogSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Blog from "./Blog";
import BlogAdd from "./BlogAdd";
import BlogUpdate from "./BlogUpdate";
import PageNotFound from "../../PageNotFound";

const BlogSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Blog} />
      <Route exact path={`${match.path}/add`} component={BlogAdd} />
      <Route exact path={`${match.path}/:blogId`} component={BlogUpdate} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default BlogSubLayout;
