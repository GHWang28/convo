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

export function setShowChannelInfoModal (boolean, channelName, channelDescription, channelId) {
  if (!boolean) {
    return {
      type: 'CHANNEL_INFO_MODAL_HIDE',
      value: boolean
    }
  }
  
  return {
    type: 'CHANNEL_INFO_MODAL_SHOW',
    value: {
      channelName,
      channelDescription,
      channelId
    }
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
