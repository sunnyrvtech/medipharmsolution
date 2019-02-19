// courseReducer.js

import { ADMIN_SET_COURSE,ADMIN_GET_COURSES } from "../../actions/types";
import isEmpty from "../../validation/is-empty";

const initialState = {
  courses: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADMIN_SET_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case ADMIN_GET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    default:
      return state;
  }
}
