// setting.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const createSetting = (setting,route_name, history) => dispatch => {
  client()
    .post("/admin/settings/create", setting)
    .then(res => history.push({ pathname: route_name,state: { alert_message:{class:'success',message: 'Page added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateSetting = (setting,route_name, history) => dispatch => {
  client()
    .put("/admin/settings/update", setting)
    .then(res => history.push({ pathname: route_name,state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const getSettings = () => async dispatch =>
  client()
    .get("/admin/settings")
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getSettingBySlug = (slug, history) => dispatch =>
  client()
    .get("/admin/settings/" + slug)
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
