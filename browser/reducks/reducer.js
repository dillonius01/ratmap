import { combineReducers } from 'redux';
import { markersReducer } from './markers';
import { centerReducer } from './center';
import { zoomReducer } from './zoom';
import { googleReducer } from './google';
import { placeReducer } from './place';
import { scoreReducer } from './score';

const rootReducer = combineReducers({
	markers: markersReducer,
	center: centerReducer,
	zoom: zoomReducer,
	google: googleReducer,
	place: placeReducer,
	score: scoreReducer
});

export default rootReducer;
