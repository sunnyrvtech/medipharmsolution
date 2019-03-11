// blog.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};
export const getBlogBySlug = (blogSlug, history) => dispatch =>
  client()
    .get("/blogs/" + blogSlug)
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
export const getBlogs = () => dispatch =>
  client()
    .get("/blogs")
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
