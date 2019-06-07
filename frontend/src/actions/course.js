// course.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};
export const getCourseByCategorySlug = (categorySlug, history) => dispatch =>
  client()
    .get("/courses/category/" + categorySlug)
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
    .get("/courses/" + courseSlug)
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

export const getUserCourses = () => dispatch =>
  client()
    .get("/courses/user")
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
export const getCourses = () => dispatch =>
  client()
    .get("/courses")
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
export const getCertificateByCourseId = (courseId, history) => dispatch =>
  client()
    .get("/courses/certificate/" + courseId)
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
export const courseEnrolled = (enrollment, history) => dispatch =>
  client()
    .post("/courses/enrollment", enrollment)
    .then(res =>
      history.push({
        pathname: "/",
        state: {
          alert_message: {
            class: "success",
            message:
              "Your Enrollment request has been sent successfully. Admin will contact you soon!"
          }
        }
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
