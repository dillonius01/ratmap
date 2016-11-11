import { combineReducers } from 'redux';
import { markersReducer } from './markers';
import { centerReducer } from './center';
import { zoomReducer } from './zoom';


const rootReducer = combineReducers({
	markers: markersReducer,
	center: centerReducer,
	zoom: zoomReducer
});

export default rootReducer;
