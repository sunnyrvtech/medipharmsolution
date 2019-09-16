// user.js

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import client from "../client";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};
export const updateUserInfo = (user, history) => dispatch =>
  client()
    .put("/account/users/update", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      return true;
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const passwordChange = (user, history) => dispatch =>
  client()
    .post("/account/users/password/change", user)
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
export const sendMessageByContactUs = (message, history) => dispatch =>
  client()
    .post("/account/users/contact-us", message)
    .then(res =>
      history.push({
        pathname: "/",
        state: {
          alert_message: {
            class: "success",
            message:
              "Your message has been sent successfully. Admin will contact you soon!"
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
export const emailSubscribed = (subscribe, history) => dispatch =>
  client()
    .post("/account/users/subscribe", subscribe)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      throw err.response.data;
    });
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
