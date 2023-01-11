export function setLogUserIn (userData) {
  return {
    type: 'LOG_USER_IN',
    value: userData
  }
}

export function setLogUserOut () {
  return {
    type: 'LOG_USER_OUT'
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

export function setShowChannelInfoModal (boolean, channelData = {}) {
  if (!boolean) {
    return {
      type: 'CHANNEL_INFO_MODAL_HIDE',
      value: boolean
    }
  }
  
  return {
    type: 'CHANNEL_INFO_MODAL_SHOW',
    value: {...channelData}
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
