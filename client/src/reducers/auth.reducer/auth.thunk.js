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

export const login = (email, password, type) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(doLogin());
    const res = await authApi.login(email, password, type);
    if (res.returnCode === 1) {
      const cookies = new Cookies();
      cookies.set('MY_TOKEN', res.token);
      cookies.set('CURR_USER', res.data.user);
      resolve(dispatch(doLoginSuccess(res.data.user)));
    } else {
      reject(dispatch(doLoginFail(res.returnMessage)));
    }
  });

export const logout = () => dispatch => {
  dispatch(doLogout());
  cookies.set('CURR_USER', '');
};
