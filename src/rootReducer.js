import { combineReducers } from 'redux';
import oauth from './containers/Login/reducer';
import signin from './containers/Signin/reducer';
import signup from './containers/SignUp/reducer';
import forgotPassword from './containers/ForgotPassword/reducer';
import reset from './containers/ResetPassword/reducer';
import getProfile from './containers/Profile/Read/reducer';
import editProfile from './containers/Profile/Update/reducer';
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
    getProfile,
    editProfile,
});

export default rootReducer;