/* 
  Putting Google obj on the store so other components have access to it, 
  not just the map. This is very helpful for autocomplete.
  
  Here, the intial state is set as an empty string so we can more easily 
  do checks when components load/update (empty obj returns truthy)

*/

/* -----------------    ACTIONS     ------------------ */

const SET_GOOGLE = 'SET_GOOGLE';
const CLEAR_GOOGLE = 'CLEAR_GOOGLE';


/* ------------   ACTION CREATORS     ------------------ */

export const setGoogle = google => ({
  type: SET_GOOGLE,
  google
});

export const clearGoogle = () => ({
  type: CLEAR_GOOGLE
});


/* ------------       REDUCER     ------------------ */

export const googleReducer = (previousState = '', action) => {
  
  switch (action.type) {
    case SET_GOOGLE:
      return action.google;

    case CLEAR_GOOGLE:
      return {};

    default:
      return previousState;
  }
};