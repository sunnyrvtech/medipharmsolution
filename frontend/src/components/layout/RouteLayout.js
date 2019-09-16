// RouteLayout.js

import React from 'react';
import { Route } from 'react-router-dom'
import Layout from './Layout';

const RouteLayout = ({ component: Component, ...rest }) => {
  //todo: logic for validate user
  return (
    <Route {...rest} render={matchProps => (
      <Layout>
        <Component {...matchProps} />
      </Layout>
    )} />
  )
};

export default RouteLayout;
