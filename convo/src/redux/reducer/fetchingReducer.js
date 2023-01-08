export default function fetchingReducer (
  state = false,
  action
) {
  switch (action.type) {
    case 'FETCHING':
      return action.value;
    default:
      return state;
  }
}
