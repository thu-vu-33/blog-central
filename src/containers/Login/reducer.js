// Responsible for updating the store without mutating it.
import { FBLOGIN_FAILURE, FBLOGIN_SUCCESS, FBLOGIN_REQUEST,
    GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE } from './constants';

const initialState = {
  payload: {},
  errors: null,
  success: false,
  failure: false,
  isFetching: false,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  const { errors, payload, type } = action;
  switch (type) {
    case FBLOGIN_SUCCESS:
      return {
        ...state,
        payload,
        errors: null,
        success: true,
        failure: false,
        isFetching: false,
        isAuthenticated: true,
      };
    case FBLOGIN_FAILURE:
      return {
        ...state,
        errors,
        payload: {},
        failure: true,
        success: false,
        isFetching: false,
        isAuthenticated: false,
      };
    case FBLOGIN_REQUEST:
      return { ...state, isFetching: true };
    case GOOGLE_LOGIN_SUCCESS:
    return {
        ...state,
        payload,
        errors: null,
        success: true,
        failure: false,
        isFetching: false,
        isAuthenticated: true,
    };
    case GOOGLE_LOGIN_FAILURE:
    return {
        ...state,
        errors,
        payload: {},
        failure: true,
        success: false,
        isFetching: false,
        isAuthenticated: false,
    };
    case GOOGLE_LOGIN_REQUEST:
    return { ...state, isFetching: true };
    default:
      return state;
  }
};