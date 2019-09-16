// blog.js

import { GET_ERRORS } from "../types";
import client from "../../client";

export const emptyReducer = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: ""
  });
};
export const createBlog = (blog, route_name, history) => dispatch => {
  client()
    .post("/admin/blogs/create", blog)
    .then(res =>
      history.push({
        pathname: route_name,
        state: {
          alert_message: {
            class: "success",
            message: "Blog added successfully!"
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
export const updateBlog = (blog, route_name, history) => dispatch => {
  client()
    .put("/admin/blogs/update", blog)
    .then(res =>
      history.push({
        pathname: route_name,
        state: {
          alert_message: { class: "success", message: "Updated successfully!" }
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
export const deleteBlog = (blogId, history) => dispatch =>
  client()
    .delete("/admin/blogs/delete/" + blogId)
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
export const getBlogs = () => async dispatch =>
  client()
    .get("/admin/blogs")
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
export const getBlogById = (blogId, history) => dispatch =>
  client()
    .get("/admin/blogs/" + blogId)
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
