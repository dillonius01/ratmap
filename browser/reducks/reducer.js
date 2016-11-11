import { combineReducers } from 'redux';
import { markersReducer } from './markers';


const rootReducer = combineReducers({
	markers: markersReducer
});

export default rootReducer;
