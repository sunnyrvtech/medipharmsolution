// StaticPage.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const emptyReducer =() => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ''
  });
};

export const getPageContentBySlug = (slug, history) => dispatch =>
  client()
    .get("/pages/content/" + slug)
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
