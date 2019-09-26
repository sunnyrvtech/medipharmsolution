// module.js

import { GET_ERRORS, ADMIN_GET_COURSES } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const createModule = (module,route_name,history) => dispatch => {
  client()
    .post("/admin/modules/create", module)
    .then(res => history.push({ pathname: route_name.split('/add')[0],state: { alert_message:{class:'success',message: 'Module added successfully!'}}}))
    .catch(err => {
      //console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateModule = (module,route_name, history) => dispatch => {
  client()
    .put("/admin/modules/update", module)
    .then(res => history.push({ pathname: route_name.split('/'+module.moduleId)[0],state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
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
    .delete("/admin/modules/delete/" + moduleId)
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

export const getModules = (courseId) => async dispatch =>
  client()
    .get("/admin/modules/course/" + courseId)
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
    .get("/admin/modules/" + moduleId)
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
