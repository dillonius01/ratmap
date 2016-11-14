/* -----------------    ACTIONS     ------------------ */

const START_LOADING = 'START_LOADING';
const END_LOADING = 'END_LOADING';


/* ------------   ACTION CREATORS     ------------------ */

export const startLoading = () => ({
  type: START_LOADING
});


export const endLoading = () => ({
  type: END_LOADING
});

/* ------------       REDUCER     ------------------ */

export const loadingReducer = (previousState = false, action) => {

  switch (action.type) {
    case START_LOADING:
      return true;

		case END_LOADING:
      return false;

    default:
      return previousState;
  }
};
