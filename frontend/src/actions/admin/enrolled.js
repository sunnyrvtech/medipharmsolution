// enrolled.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};
export const addEnrolledUser = (enrolled, route_name, history) => dispatch => {
  client()
    .post("/admin/enrolled/create", enrolled)
    .then(res =>
      history.push({
        pathname: route_name.split("/add")[0],
        state: {
          alert_message: { class: "success", message: "Added successfully!" }
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
};
export const updateEnrolledUser = (
  enrolled,
  route_name,
  history
) => dispatch => {
  client()
    .put("/admin/enrolled/update", enrolled)
    .then(res =>
      history.push({
        pathname: route_name.split("/" + enrolled.enrolledId)[0],
        state: {
          alert_message: { class: "success", message: "Updated successfully!" }
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
};
export const deleteEnrolledUser = (enrolledId, history) => dispatch =>
  client()
    .delete("/admin/enrolled/delete/" + enrolledId)
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

export const getEnrolledUsers = () => async dispatch =>
  client()
    .get("/admin/enrolled")
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
export const getEnrolledUserById = (enrolledId, history) => dispatch =>
  client()
    .get("/admin/enrolled/" + enrolledId)
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
