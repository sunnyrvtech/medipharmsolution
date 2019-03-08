// authentication.js

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";
import client from "../client";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};
export const registerUser = (user, history) => dispatch => {
  client()
    .post("/users/register", user)
    .then(res =>
      history.push({
        pathname: "/login",
        state: {
          alert_message: {
            class: "success",
            message:
              "Your account has been created! We have sent you an email to activate your account."
          }
        }
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  client()
    .post("/users/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const verifyAccount = (verify_link, history) => dispatch => {
  client()
    .get("/users/account/activate/" + verify_link)
    .then(res =>
      history.push({
        pathname: "/login",
        state: {
          alert_message: {
            class: "success",
            message: "Your account has been activated. You may now sign in!"
          }
        }
      })
    )
    .catch(err =>
      history.push({
        pathname: "/login",
        state: {
          alert_message: {
            class: "success",
            message: err.response.data.message
          }
        }
      })
    );
};

export const forgotPassword = (user, history) => dispatch =>
  client()
    .post("/users/password/forgot", user)
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

export const resetPassword = (user, history) => dispatch => {
  client()
    .post("/users/password/reset", user)
    .then(res =>
      history.push({
        pathname: "/login",
        state: {
          alert_message: {
            class: "success",
            message:
              "Your password has been changed successfully.You may sign in with your new password!"
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
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  if (history) history.push("/login");
  else window.location.href = "/";
};
