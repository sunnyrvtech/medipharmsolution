// category.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const getCategories = () => async dispatch =>
  client()
    .get("/categories")
    .then(res => {return res.data;})
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
