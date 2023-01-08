import { combineReducers } from '@reduxjs/toolkit';
import channelCreateModalReducer from './channelCreateModalReducer';
import channelSearchModalReducer from './channelSearchModalReducer';
import fetchingReducer from './fetchingReducer';
import loggedInUserDataReducer from './loggedInUserDataReducer';
import logOutModalReducer from './logOutModalReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  loggedInUserData: loggedInUserDataReducer,
  logOutModal: logOutModalReducer,
  channelCreateModal: channelCreateModalReducer,
  channelSearchModal: channelSearchModalReducer,
  fetching: fetchingReducer
})

export default combinedReducer;