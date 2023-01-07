export default function loggedInUserDataReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'LOG_USER_IN':
      return action.value;
    case 'LOG_USER_OUT':
      return null;
    default:
      return state;
  }
}
