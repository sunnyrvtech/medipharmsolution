// CourseSubLayout.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import Course from "./Course";
import CourseAdd from "./CourseAdd";
import CourseUpdate from "./CourseUpdate";
import Module from "./Module";
import ModuleAdd from "./ModuleAdd";
import ModuleUpdate from "./ModuleUpdate";
import Quiz from "../quiz/Quiz";
import QuizAdd from "../quiz/QuizAdd";
import QuizUpdate from "../quiz/QuizUpdate";
import PageNotFound from "../../PageNotFound";

const CourseSubLayout = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Course} />
      <Route exact path={`${match.path}/add`} component={CourseAdd} />
      <Route exact path={`${match.path}/:courseId`} component={CourseUpdate} />
      <Route exact path={`${match.path}/:courseId/module`} component={Module} />
      <Route exact path={`${match.path}/:courseId/module/add`} component={ModuleAdd} />
      <Route exact path={`${match.path}/:courseId/module/:moduleId`} component={ModuleUpdate} />
      <Route exact path={`${match.path}/:courseId/module/:moduleId`+'/quiz'} component={Quiz} />
      <Route exact path={`${match.path}/:courseId/module/:moduleId`+'/quiz/add'} component={QuizAdd} />
      <Route exact path={`${match.path}/:courseId/module/:moduleId`+'/quiz/'+`:quizId`} component={QuizUpdate} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default CourseSubLayout;
