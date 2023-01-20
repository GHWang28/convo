export default function loggedInUserDataReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'LOG_USER_IN':
      return action.value;
    default:
      return state;
  }
}
