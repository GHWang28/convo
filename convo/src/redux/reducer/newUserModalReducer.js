export default function newUserModalReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'NEW_USER_MODAL':
      return action.value;
    default:
      return state;
  }
}
