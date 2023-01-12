export default function channelMemberReducerModal (
  state = [],
  action
) {
  switch (action.type) {
    case 'CHANNEL_MEMBER_MODAL':
      return action.value;
    default:
      return state;
  }
}
