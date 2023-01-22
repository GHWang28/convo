export function setLogUserIn (userData) {
  return {
    type: 'LOG_USER_IN',
    value: userData
  }
}

export function setShowLogOutModal (boolean) {
  return {
    type: 'LOG_OUT_MODAL',
    value: boolean
  }
}

export function setShowChannelCreateModal (boolean) {
  return {
    type: 'CHANNEL_CREATE_MODAL',
    value: boolean
  }
}

export function setShowChannelSearchModal (boolean) {
  return {
    type: 'CHANNEL_SEARCH_MODAL',
    value: boolean
  }
}

export function setShowChannelEditModal (channelData) {
  if (!channelData) return {
    type: 'CHANNEL_EDIT_MODAL',
    value: null
  }
  // Delete non-serialisable data
  const channelDataCopy = {...channelData};
  delete channelDataCopy.dateCreated;

  return {
    type: 'CHANNEL_EDIT_MODAL',
    value: channelDataCopy
  }
}

export function setShowChannelJoinModal (channelData) {
  if (!channelData) return {
    type: 'CHANNEL_JOIN_MODAL',
    value: null
  }
  // Delete non-serialisable data
  const channelDataCopy = {...channelData};
  delete channelDataCopy.dateCreated;

  return {
    type: 'CHANNEL_JOIN_MODAL',
    value: channelDataCopy
  }
}

export function setShowChannelLeaveModal (channelData) {
  if (!channelData) return {
    type: 'CHANNEL_LEAVE_MODAL',
    value: null
  }
  // Delete non-serialisable data
  const channelDataCopy = {...channelData};
  delete channelDataCopy.dateCreated;

  return {
    type: 'CHANNEL_LEAVE_MODAL',
    value: channelDataCopy
  }
}

export function setShowChannelMemberModal (userArray) {
  return {
    type: 'CHANNEL_MEMBER_MODAL',
    value: userArray
  }
}

export function setShowChannelInfoModal (boolean, channelData = {}) {
  if (!boolean) {
    return {
      type: 'CHANNEL_INFO_MODAL_HIDE',
      value: boolean
    }
  }
  
  return {
    type: 'CHANNEL_INFO_MODAL_SHOW',
    value: {
      ...channelData,
      dateCreated: channelData?.dateCreated?.seconds,
    }
  }
}

export function setShowMessageDeleteModal (messageData = {}) {
  if (!messageData) return {
    type: 'MESSAGE_DELETE_MODAL',
    value: null
  }

  return {
    type: 'MESSAGE_DELETE_MODAL',
    value: {
      ...messageData,
      timestamp: messageData?.timestamp?.seconds,
      timestampEdit: messageData?.timestampEdit?.seconds
    }
  }
}

export function setShowNewUserModal (newUser = {}) {
  if (!newUser) return {
    type: 'NEW_USER_MODAL',
    value: null
  }

  return {
    type: 'NEW_USER_MODAL',
    value: { ...newUser }
  }
}

export function setShowUserModal (uid) {
  return {
    type: 'USER_MODAL',
    value: uid
  }
}

export function setFetching (boolean) {
  return {
    type: 'FETCHING',
    value: boolean
  }
}

export const setImageZoom = (src) => {
  return {
    type: 'SET_IMAGE_ZOOM',
    value: src
  };
}

export function setShowChannelNotifications (boolean) {
  localStorage.setItem('showNotification', boolean);
  return {
    type: 'CHANNEL_NOTIFICTION',
    value: boolean
  }
}
