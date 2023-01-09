const setImageZoomReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_IMAGE_ZOOM':
      return action.value;
    default:
      return state;
  }
}

export default setImageZoomReducer;