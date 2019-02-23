// course.js

import { GET_ERRORS, ADMIN_GET_COURSES } from "./types";
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
