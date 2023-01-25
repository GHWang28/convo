export default function channelInviteModalReducer (
  state = [],
  action
) {
  switch (action.type) {
    case 'CHANNEL_INVITE_MODAL':
      return action.value;
    default:
      return state;
  }
}
