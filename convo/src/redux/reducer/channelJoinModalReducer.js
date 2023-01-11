export default function channelJoinModalReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'CHANNEL_JOIN_MODAL':
      return action.value;
    default:
      return state;
  }
}
