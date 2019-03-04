// quiz.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};
export const getQuizByModuleId = (moduleId, history) => dispatch =>
  client()
    .get("/quiz/module/" + moduleId)
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
export const addQuizResult = (quiz, history) => dispatch =>
  client()
    .post("/quiz/module/history", quiz)
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
    export const getQuizHistoryByUserId = (userId, history) => dispatch =>
      client()
        .get("/quiz/module/history/" + userId)
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
