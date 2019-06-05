import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
// import detailReducer from './detailReducer';
import categoriesReducer from './categoriesReducer';
import filterReducer from './filterReducer';
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
	homeReducer,
	// detailReducer,
	categoriesReducer,
	filterReducer,
	cartReducer
});

export default rootReducer
