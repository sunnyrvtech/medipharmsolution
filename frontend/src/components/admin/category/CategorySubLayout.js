// CategorySubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Category from "./Category";
import CategoryAdd from "./CategoryAdd";
import CategoryUpdate from "./CategoryUpdate";
import PageNotFound from "../../PageNotFound";

const CategorySubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Category} />
      <Route exact path={`${match.path}/add`} component={CategoryAdd} />
      <Route exact path={`${match.path}/:categoryId`} component={CategoryUpdate} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default CategorySubLayout;
