// setting.js

import { GET_ERRORS } from "./types";
import client from "../client";

export const getSettingBySlug = (slug, history) => dispatch =>
  client()
    .get("/settings/" + slug)
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
