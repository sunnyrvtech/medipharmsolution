// course.js

import { GET_ERRORS, ADMIN_GET_COURSES } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const courseAdd = (course, history) => dispatch => {
  client()
    .post("/admin/courses/create", course)
    .then(res => history.push({ pathname: '/admin/courses',state: { alert_message:{class:'success',message: 'New course added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const courseUpdate = (course, history) => dispatch => {
  client()
    .put("/admin/courses/update", course)
    .then(res => history.push({ pathname: '/admin/courses',state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const courseDelete = (courseId, history) => dispatch =>
  client()
    .delete("/admin/courses/delete/"+courseId)
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

export const getCourses = course => async dispatch => {
  client()
    .get("/admin/courses")
    .then(res => {
      dispatch({
        type: ADMIN_GET_COURSES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const getCourseById = (courseId, history) => dispatch =>
  client()
    .get("/admin/courses/" + courseId)
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
