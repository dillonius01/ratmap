
/* -----------------    ACTIONS     ------------------ */

const SET_PLACE = 'SET_PLACE';
const CLEAR_PLACE = 'CLEAR_PLACE';


/* ------------   ACTION CREATORS     ------------------ */

export const setPlace = place => ({
  type: SET_PLACE,
  place
});

export const clearPlace = () => ({
	type: CLEAR_PLACE
});


/* ------------       REDUCER     ------------------ */

export const placeReducer = (previousState = {}, action) => {
  
  switch (action.type) {
    case SET_PLACE:
      return action.place;
    
    case CLEAR_PLACE:
    	return {};

    default:
      return previousState;
  }
};
