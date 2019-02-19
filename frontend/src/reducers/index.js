// index.js

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import courseReducer from './admin/courseReducer';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   courses: courseReducer
})
