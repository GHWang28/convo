export default function logOutModalReducer (
  state = false,
  action
) {
  switch (action.type) {
    case 'LOG_OUT_MODAL':
      return action.value;
    default:
      return state;
  }
}
