import { combineReducers } form 'redux';
import authReducers from './authReducer';

export default combineReducers ({
  auth: authReducer
});