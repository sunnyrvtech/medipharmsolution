// category.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const createCategory = (category,route_name, history) => dispatch => {
  client()
    .post("/admin/categories/create", category)
    .then(res => history.push({ pathname: route_name,state: { alert_message:{class:'success',message: 'Category added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateCategory = (category,route_name, history) => dispatch => {
  client()
    .put("/admin/categories/update", category)
    .then(res => history.push({ pathname: route_name,state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteCategory = (categoryId, history) => dispatch =>
  client()
    .delete("/admin/categories/delete/" + categoryId)
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


export const getCategories = () => async dispatch =>
  client()
    .get("/admin/categories")
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getCategoryById = (categoryId, history) => dispatch =>
  client()
    .get("/admin/categories/" + categoryId)
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
