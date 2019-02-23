// App.js

import React, { Component } from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Verification from "./components/account/Verification";
import ResetPassword from "./components/ResetPassword";
import RouteLayout from "./components/layout/RouteLayout";
import AdminRoute from "./components/admin/AdminRoute";
import Course from "./components/courses/Course";
import CourseView from "./components/courses/CourseView";
import PageNotFound from "./components/PageNotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import "./styles/sb-admin.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <Switch>
            <RouteLayout exact path="/" component={Home} />
            <RouteLayout exact path="/login" component={Login} />
            <RouteLayout exact path="/register" component={Register} />
            <RouteLayout exact path="/password/forgot" component={ForgotPassword} />
            <RouteLayout exact path="/password/reset/:code" component={ResetPassword} />
            <RouteLayout exact path="/account/activate/:code" component={Verification} />
            <Route path="/admin" component={AdminRoute} />
            <RouteLayout exact path="/:categorySlug" component={Course} />
            <RouteLayout exact path="/:categorySlug/:courseSlug" component={CourseView} />
            <RouteLayout component={PageNotFound} />
            </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
