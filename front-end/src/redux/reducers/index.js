import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import detailsReducer from './detailsReducer';
import categoriesReducer from './categoriesReducer';
import filterReducer from './filterReducer';
import cartReducer from './cartReducer';
import sortReducer from './sortReducer';

const rootReducer = combineReducers({
	homeReducer,
	detailsReducer,
	categoriesReducer,
	filterReducer,
	cartReducer,
	sortReducer
});

export default rootReducer
