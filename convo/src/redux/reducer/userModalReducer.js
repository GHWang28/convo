export default function userModalReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'USER_MODAL':
      return action.value;
    default:
      return state;
  }
}
