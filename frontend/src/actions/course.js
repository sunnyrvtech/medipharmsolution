// course.js

import { GET_ERRORS, ADMIN_GET_COURSES } from "./types";
import client from "../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const getCourseByCategory = (slug, history) => dispatch =>
  client()
    .get("/course/" + slug)
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
