// media.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};

export const getGalleries = () => async dispatch =>
  client()
    .get("/admin/media")
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

export const uploadImage = (file, route_name, history) => dispatch => {
  const formData = new FormData();
        formData.append('myImage',file);

  client()
    .post("/admin/media/upload", formData)
    .then(res =>
      history.push({
        pathname: route_name.split("/upload")[0],
        state: {
          alert_message: {
            class: "success",
            message: "Image uploaded successfully!"
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

export const deleteImage = (images, history) => dispatch =>
  client()
    .post("/admin/media/delete" , images)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err.response.data;
    });
