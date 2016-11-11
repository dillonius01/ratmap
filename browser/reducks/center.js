/* -----------------    ACTIONS     ------------------ */

const SET_CENTER = 'SET_CENTER';



/* ------------   ACTION CREATORS     ------------------ */

export const setCenter = br => {
  let latLng = {};

  switch (br) {
    case 'Manhattan':
      latLng.lat = 40.7791;
      latLng.lng = -73.9685;
      break;
    case 'Brooklyn':
      latLng.lat = 40.6473;
      latLng.lng = -73.9449;
      break;
    case 'Queens':
      latLng.lat = 40.73255;
      latLng.lng = -73.8277;
      break;
    case 'Bronx':
      latLng.lat = 40.8458;
      latLng.lng = -73.8747;
      break;
    case 'StatenIsland':
      latLng.lat = 40.589;
      latLng.lng = -74.1425;
      break;
    default:
      latLng.lat = 40.7484405;
      latLng.lng = -73.9878531;
  }

  return {
    type: SET_CENTER,
    latLng
  };
};


/* ------------       REDUCER     ------------------ */

export const centerReducer = (previousState = {lat: 40.7484405, lng: -73.9878531}, action) => {
  
  switch (action.type) {
    case SET_CENTER:
      return action.latLng;

    default:
      return previousState;
  }
};