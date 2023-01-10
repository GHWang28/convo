export default function channelEditModalReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'CHANNEL_EDIT_MODAL':
      return action.value;
    default:
      return state;
  }
}
