import { combineReducers } from 'redux';
import oauth from './containers/Login/reducer';
import signin from './containers/Signin/reducer';
import signup from './containers/SignUp/reducer';
import forgotPassword from './containers/ForgotPassword/reducer';
import reset from './containers/ResetPassword/reducer';
import fetchArticle from './containers/Article/Read/reducer';
import createArticle from './containers/Article/Create/reducer';

const rootReducer = combineReducers({
    oauth,
    createArticle,
    fetchArticle,
    signin,
    signup,
    forgotPassword,
    reset,
});

export default rootReducer;