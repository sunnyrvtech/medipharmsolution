// MediaSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Media from "./Media";
import PageNotFound from "../../PageNotFound";

const CategorySubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Media} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default CategorySubLayout;
