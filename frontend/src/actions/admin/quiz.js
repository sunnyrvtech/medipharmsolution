// quiz.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};
export const createQuiz = (quiz,route_name, history) => dispatch => {
  client()
    .post("/admin/quiz/create", quiz)
    .then(res => history.push({ pathname: route_name.split('/add')[0],state: { alert_message:{class:'success',message: 'Quiz added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateQuiz = (quiz,route_name, history) => dispatch => {
  client()
    .put("/admin/quiz/update", quiz)
    .then(res => history.push({ pathname: route_name.split('/'+quiz.quizId)[0],state: { alert_message:{class:'success',message: 'Updated successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteQuiz = (quizId, history) => dispatch =>
  client()
    .delete("/admin/quiz/delete/" + quizId)
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


export const getQuizes = (moduleId) => async dispatch =>
  client()
    .get("/admin/quiz/module/"+moduleId)
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
export const getQuizById = (quizId, history) => dispatch =>
  client()
    .get("/admin/quiz/" + quizId)
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
