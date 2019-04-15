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
import Profile from "./components/account/Profile";
import PasswordChange from "./components/account/Password";
import CourseList from "./components/account/CourseList";
import PaymentHistory from "./components/account/PaymentHistory";
import Module from "./components/account/Module";
import Quiz from "./components/account/Quiz";
import Certificate from "./components/account/Certificate";
import ModuleList from "./components/account/ModuleList";
import Course from "./components/courses/Course";
import CourseView from "./components/courses/CourseView";
import Blog from "./components/blog/Blog";
import BlogView from "./components/blog/BlogView";
import StaticPage from "./components/StaticPage";
import PageNotFound from "./components/PageNotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import "./styles/sb-admin.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
let isAuthenticated = false;
if (localStorage.jwtToken) {
  isAuthenticated = true;
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    isAuthenticated = false;
    store.dispatch(logoutUser(false));
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
            <RouteLayout exact path="/about-us" component={StaticPage} />
            <RouteLayout exact path="/free-website-resources-to-be-added" component={StaticPage} />
            <RouteLayout exact path="/resume-writing" component={StaticPage} />
            <RouteLayout exact path="/job-search" component={StaticPage} />
            <RouteLayout exact path="/interview-preparation" component={StaticPage} />
            <RouteLayout exact path="/phone-interview-preparation" component={StaticPage} />
            <RouteLayout exact path="/in-person-interview-preparation" component={StaticPage} />
            <RouteLayout exact path="/after-interview" component={StaticPage} />
            <RouteLayout exact path="/collaborations" component={StaticPage} />
            <RouteLayout exact path="/blog" component={Blog} />
            <RouteLayout exact path="/blog/:blogSlug" component={BlogView} />
            { isAuthenticated == true &&
            <Switch>
            <RouteLayout exact path="/account/profile" component={Profile} />
            <RouteLayout exact path="/account/password/change" component={PasswordChange} />
            <RouteLayout exact path="/account/courses" component={CourseList} />
            <RouteLayout exact path="/account/modules/:courseId" component={ModuleList} />
            <RouteLayout exact path="/account/modules/module/:moduleId" component={Module} />
            <RouteLayout exact path="/account/cert/:courseId" component={Certificate} />
            <RouteLayout exact path="/account/quiz/:moduleId" component={Quiz} />
            // <RouteLayout exact path="/account/payment/history" component={PaymentHistory} />
            <RouteLayout exact path="/:categorySlug" component={Course} />
            <RouteLayout exact path="/:categorySlug/:courseSlug" component={CourseView} />
            <RouteLayout component={PageNotFound} />
            </Switch>
            }
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
