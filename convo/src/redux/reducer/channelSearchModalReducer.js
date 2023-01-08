export default function channelSearchModalReducer (
  state = false,
  action
) {
  switch (action.type) {
    case 'CHANNEL_SEARCH_MODAL':
      return action.value;
    default:
      return state;
  }
}
