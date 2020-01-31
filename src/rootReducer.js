import { combineReducers } from 'redux';
import oauth from './containers/Login/reducer';
import signin from './containers/Signin/reducer';
import signup from './containers/SignUp/reducer';
import forgotPassword from './containers/ForgotPassword/reducer';
import reset from './containers/ResetPassword/reducer';

const rootReducer = combineReducers({ oauth, signin, signup, forgotPassword, reset });

export default rootReducer;