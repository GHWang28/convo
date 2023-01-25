import { combineReducers } from '@reduxjs/toolkit';
import channelCreateModalReducer from './channelCreateModalReducer';
import channelEditModalReducer from './channelEditModalReducer';
import channelInfoModalReducer from './channelInfoModalReducer';
import channelJoinModalReducer from './channelJoinModalReducer';
import channelLeaveModalReducer from './channelLeaveModalReducer';
import channelMemberReducerModal from './channelMemberModalReducer';
import channelNotificationReducer from './channelNotificationReducer';
import channelSearchModalReducer from './channelSearchModalReducer';
import fetchingReducer from './fetchingReducer';
import loggedInUserDataReducer from './loggedInUserDataReducer';
import logOutModalReducer from './logOutModalReducer';
import messageDeleteModalReducer from './messageDeleteModalReducer';
import setImageZoomReducer from './setImageZoomReducer';
import userModalReducer from './userModalReducer';
import editUserModalReducer from './editUserModalReducer';
import channelInviteModalReducer from './channelInviteModalReducer';

/**
 * Combines reducers for Redux
 */
const combinedReducer = combineReducers({
  loggedInUserData: loggedInUserDataReducer,
  logOutModal: logOutModalReducer,
  messageDeleteModal: messageDeleteModalReducer,
  channelNotification: channelNotificationReducer,
  channelLeaveModal: channelLeaveModalReducer,
  channelMemberModal: channelMemberReducerModal,
  channelJoinModal: channelJoinModalReducer,
  channelCreateModal: channelCreateModalReducer,
  channelSearchModal: channelSearchModalReducer,
  channelInfoModal: channelInfoModalReducer,
  channelEditModal: channelEditModalReducer,
  editUserModal: editUserModalReducer,
  channelInviteModal: channelInviteModalReducer,
  userModal: userModalReducer,
  imgZoom: setImageZoomReducer,
  fetching: fetchingReducer
})

export default combinedReducer;