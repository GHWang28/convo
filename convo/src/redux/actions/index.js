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
