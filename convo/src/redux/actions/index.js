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

export function setFetching (boolean) {
  return {
    type: 'FETCHING',
    value: boolean
  }
}
