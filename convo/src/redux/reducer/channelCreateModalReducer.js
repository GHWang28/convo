export default function channelCreateModalReducer (
  state = false,
  action
) {
  switch (action.type) {
    case 'CHANNEL_CREATE_MODAL':
      return action.value;
    default:
      return state;
  }
}
