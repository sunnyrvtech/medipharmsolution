// StaticPage.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const createStaticPage = (page,route_name, history) => dispatch => {
  client()
    .post("/admin/pages/create", page)
    .then(res => history.push({ pathname: route_name.split('/add')[0],state: { alert_message:{class:'success',message: 'Page added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateStaticPage = (page,route_name, history) => dispatch => {
  client()
    .put("/admin/pages/update", page)
    .then(res => history.push({ pathname: route_name.split('/'+page.pageId)[0],state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getstaticPages = () => async dispatch =>
  client()
    .get("/admin/pages")
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getPageContentById = (pageId, history) => dispatch =>
  client()
    .get("/admin/pages/" + pageId)
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
