import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_SCORE = 'SET_SCORE';



/* ------------   ACTION CREATORS     ------------------ */

export const setScore = score => ({
  type: SET_SCORE,
  score
});


/* ------------       REDUCER     ------------------ */

export const scoreReducer = (previousState = 0, action) => {
  
  switch (action.type) {
    case SET_SCORE:
      return action.score;

    default:
      return previousState;
  }
};

/* ------------       DISPATCHERS     ------------------ */

export const fetchScore = (lat, lng, brgh) => {
  return dispatch => {
    axios.get(`/api/score/${lat}/${lng}/${brgh}`)
      .then(score => {
        console.log('got score!', score.data.score)
        dispatch(setScore(score.data.score))
      })
      .catch(err => console.error(err))
  };
};