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

    export const getCourses = () => dispatch =>
      client()
        .get("/course")
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
        .get("/module/" + courseId)
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
            .get("/course/certificate/" + courseId)
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
