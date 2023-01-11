export default function channelLeaveModalReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'CHANNEL_LEAVE_MODAL':
      return action.value;
    default:
      return state;
  }
}
