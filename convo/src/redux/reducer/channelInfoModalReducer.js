export default function channelInfoModalReducer (
  state = { show: false },
  action
) {
  switch (action.type) {
    case 'CHANNEL_INFO_MODAL_HIDE':
      return {
        ...state,
        show: false
      }
    case 'CHANNEL_INFO_MODAL_SHOW':
      return {
        ...action.value,
        show: true
      }
    default:
      return state;
  }
}
