import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const ADD_MARKERS = 'ADD_MARKERS';
const CLEAR_MARKERS = 'CLEAR_MARKERS';



/* ------------   ACTION CREATORS     ------------------ */

export const addMarkers = markers => ({
  type: ADD_MARKERS,
  markers
});

export const clearMarkers = () => ({
  type: CLEAR_MARKERS
})


/* ------------       REDUCER     ------------------ */

export const markersReducer = (previousState = [], action) => {
  
  switch (action.type) {
    case ADD_MARKERS:
      return [...action.markers];

    case CLEAR_MARKERS:
      return [];

    default:
      return previousState;
  }
};


/* ------------       DISPATCHERS     ------------------ */

export const fetchNonPassing = () => {
  return dispatch => {
    axios.get(`/api/nonpassing/`)
      .then(inspections => {
        console.log('got inspections!', inspections.data.length)
        dispatch(addMarkers(inspections.data))
      })
      .catch(err => console.error(err))
  };
};

export const fetchBorough = borough => {
  return dispatch => {
    axios.get(`/api/borough/${borough}`)
      .then(inspections => {
        console.log(`got inspections for ${borough}!`, inspections.data.length)
        dispatch(addMarkers(inspections.data))
      })
  }
}

export const fetchWithinDistance = (lat, lng, brgh) => {
  return dispatch => {
    axios.get(`/api/distance/${lat}/${lng}/${brgh}`)
      .then(inspections => {
        console.log('got within a certain distance from the point!', inspections.data.length);
        dispatch(addMarkers(inspections.data));
      })
      .catch(err => console.error(err));
  }
}



export const fetchAllRats = () => {
  return dispatch => {
    axios.get(`/api/allrats`)
      .then(inspections => {
        console.log('got allll inspections', inspections.data.length);
        dispatch(addMarkers(inspections.data));
      })
      .catch(err => console.error(err));
  }
}
