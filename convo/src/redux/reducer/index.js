import { combineReducers } from '@reduxjs/toolkit';
import loggedInUserDataReducer from './loggedInUserDataReducer';
import logOutModalReducer from './logOutModalReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  loggedInUserData: loggedInUserDataReducer,
  logOutModal: logOutModalReducer
})

export default combinedReducer;