import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import detailsReducer from './detailsReducer';
import filterReducer from './filterReducer';
import sortReducer from './sortReducer';

const rootReducer = combineReducers({
	homeReducer,
	detailsReducer,
	filterReducer,
	sortReducer
});

export default rootReducer
