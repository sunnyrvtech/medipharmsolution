// module.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const getModules = (courseId) => dispatch =>
  client()
    .get("/modules/"+courseId)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
});

export const getModulesfront = (courseId) => dispatch =>
  client()
    .get("/modules/front/"+courseId)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getModuleByModuleId = (moduleId, history) => dispatch =>
client()
.get("/modules/module/" + moduleId)
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
