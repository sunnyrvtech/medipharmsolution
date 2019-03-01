// course.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const getCourseByCategorySlug = (categorySlug, history) => dispatch =>
  client()
    .get("/course/category/" + categorySlug)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getCourseByCourseSlug = (courseSlug, history) => dispatch =>
  client()
    .get("/course/" + courseSlug)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

    export const getCourseByUserId = (userId, history) => dispatch =>
      client()
        .get("/course/user/" + userId)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
    export const getModuleByCourseId = (courseId, history) => dispatch =>
      client()
        .get("/course/module/" + courseId)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
