/* -----------------    ACTIONS     ------------------ */

const SET_ZOOM = 'SET_ZOOM';



/* ------------   ACTION CREATORS     ------------------ */

export const setZoom = location => {
  let zoom;

  switch (location) {
    case 'NYC':
      zoom = 11;
      break;
    default:
      zoom = 12;
  }

  return {
    type: SET_ZOOM,
    zoom
  };
};


/* ------------       REDUCER     ------------------ */

export const zoomReducer = (previousState = 11, action) => {
  
  switch (action.type) {
    case SET_ZOOM:
      return action.zoom;

    default:
      return previousState;
  }
};