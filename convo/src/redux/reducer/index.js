import { combineReducers } from '@reduxjs/toolkit';
import channelCreateModalReducer from './channelCreateModalReducer';
import channelInfoModalReducer from './channelInfoModalReducer';
import channelSearchModalReducer from './channelSearchModalReducer';
import fetchingReducer from './fetchingReducer';
import loggedInUserDataReducer from './loggedInUserDataReducer';
import logOutModalReducer from './logOutModalReducer';
import setImageZoomReducer from './setImageZoomReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  loggedInUserData: loggedInUserDataReducer,
  logOutModal: logOutModalReducer,
  channelCreateModal: channelCreateModalReducer,
  channelSearchModal: channelSearchModalReducer,
  channelInfoModal: channelInfoModalReducer,
  imgZoom: setImageZoomReducer,
  fetching: fetchingReducer
})

export default combinedReducer;