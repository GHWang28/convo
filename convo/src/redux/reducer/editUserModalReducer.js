export default function editUserModalReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'EDIT_USER_MODAL':
      return action.value;
    default:
      return state;
  }
}
