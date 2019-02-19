// media.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};

export const getGalleries = () => async dispatch =>
  client()
    .get("/quiz")
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

export const uploadImage = (quiz,route_name, history) => dispatch => {
  client()
    .post("/quiz/create", quiz)
    .then(res => history.push({ pathname: route_name.split('/add')[0],state: { alert_message:{class:'success',message: 'Quiz added successfully!'}}}))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteImage = (quizId, history) => dispatch =>
  client()
    .delete("/quiz/delete/" + quizId)
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

