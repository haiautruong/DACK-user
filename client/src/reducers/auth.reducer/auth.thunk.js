import { Cookies } from 'react-cookie';

import { authApi } from '../../api';
import {
  doClearResult,
  doLogin,
  doLoginFail,
  doLoginSuccess,
  doLogout
} from './auth.action';
const cookies = new Cookies();

export const login = (email, password, type) => async dispatch => {
  dispatch(doLogin());
  const res = await authApi.login(email, password, type);
  if (res.returnCode === 1) {
    const cookies = new Cookies();
    cookies.set('MY_TOKEN', res.token);
    cookies.set('CURR_USER', res.data.user);
    dispatch(doLoginSuccess(res.data.user));
  } else {
    dispatch(doLoginFail(res.returnMessage));
  }
};

export const logout = () => async dispatch => {
  dispatch(doLogout());
  cookies.set('CURR_USER', '');
};
