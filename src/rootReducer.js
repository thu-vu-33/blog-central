import { combineReducers } from 'redux';
import oauth from './containers/Login/reducer';
import signin from './containers/Signin/reducer';
import signup from './containers/SignUp/reducer';

const rootReducer = combineReducers({ oauth, signin, signup });

export default rootReducer;