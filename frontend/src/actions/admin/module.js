// module.js

import { GET_ERRORS, ADMIN_GET_COURSES } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const createModule = (module, history) => dispatch => {
  client()
    .post("/admin/courses/module", module)
    .then(res => history.push({ pathname: '/admin/courses/module',state: { alert_message:{class:'success',message: 'Module added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateModule = (module, history) => dispatch => {
  client()
    .put("/admin/courses/module", module)
    .then(res => history.push({ pathname: '/admin/courses/module',state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteModule = (moduleId, history) => dispatch =>
  client()
    .delete("/admin/courses/module/" + moduleId)
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


export const getModules = () => async dispatch =>
  client()
    .get("/admin/courses/module")
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getModuleById = (moduleId, history) => dispatch =>
  client()
    .get("/admin/courses/module/" + moduleId)
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
