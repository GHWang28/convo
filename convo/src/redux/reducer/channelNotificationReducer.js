export default function channelNotificationReducer (
  state = (localStorage.getItem('showNotification') === null) ? true : (localStorage.getItem('showNotification') === 'true'),
  action
) {
  switch (action.type) {
    case 'CHANNEL_NOTIFICTION':
      return action.value;
    default:
      return state;
  }
}
