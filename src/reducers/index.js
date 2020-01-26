import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import inventoryReducer from './inventoryReducer';

export default combineReducers({loginReducer, inventoryReducer});