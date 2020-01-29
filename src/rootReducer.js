import { combineReducers } from 'redux';
import oauth from './containers/Login/reducer';

const rootReducer = combineReducers({ oauth });

export default rootReducer;