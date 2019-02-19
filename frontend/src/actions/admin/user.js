// user.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const createUser = (user, history) => dispatch => {
  client()
    .post("/users/create", user)
    .then(res => history.push({ pathname: '/admin/users',state: { alert_message:{class:'success',message: 'User added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateUser = (user, history) => dispatch => {
  client()
    .put("/users/update", user)
    .then(res => history.push({ pathname: '/admin/users',state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteUser = (userId, history) => dispatch =>
  client()
    .delete("/users/delete/" + userId)
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


export const getUsers = () => async dispatch =>
  client()
    .get("/users")
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getUserById = (userId, history) => dispatch =>
  client()
    .get("/users/" + userId)
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
