export default function messageDeleteModalReducer (
  state = null,
  action
) {
  switch (action.type) {
    case 'MESSAGE_DELETE_MODAL':
      return action.value;
    default:
      return state;
  }
}
