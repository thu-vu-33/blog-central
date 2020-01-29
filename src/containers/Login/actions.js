// Actions -> informs reducers the state that should be uodated in the store
import { FBLOGIN_SUCCESS,
    FBLOGIN_FAILURE,
    FBLOGIN_REQUEST,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAILURE } from './constants';
import api from '../../utils/api';

export const googleSuccess = payload => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload,
});

export const googleFailure = errors => ({
  type: GOOGLE_LOGIN_FAILURE,
  errors,
});

export const googleSigningIn = () => ({
  type: GOOGLE_LOGIN_REQUEST,
});

export const facebookSuccess = payload => ({
    type: FBLOGIN_SUCCESS,
    payload,
  });
  
  export const facebookFailure = errors => ({
    type: FBLOGIN_FAILURE,
    errors,
  });
  
  export const facebookSigningIn = () => ({
    type: FBLOGIN_REQUEST,
  });

export const facebookSignin = (data, history) => (dispatch) => {
  dispatch(facebookSigningIn());
  api({ endpoint: '/oauth/', method: 'POST', data: {...data.cred}
    })
    .then((payload) => {
      localStorage.setItem('user', JSON.stringify(payload));
      dispatch(facebookSuccess(payload.user));
      history.push('/');
    })
    .catch((error) => {
      dispatch(facebookFailure(error));
    });
};

export const googleSignin = (data, history) => (dispatch) => {
    dispatch(googleSigningIn());
    api({ endpoint: '/oauth/', method: 'POST', data: {...data.cred} })
      .then((payload) => {
        localStorage.setItem('user', JSON.stringify(payload));
        dispatch(googleSuccess(payload.user));
        history.push('/');
      })
      .catch((error) => {
        dispatch(googleFailure(error));
      });
  };