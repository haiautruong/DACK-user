/* eslint-disable no-async-promise-executor */
import { Cookies } from 'react-cookie';

import { authApi } from '../../api';
import { doLogin, doLoginFail, doLoginSuccess, doLogout } from './auth.action';

const cookies = new Cookies();

export const login = (email, password, type) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(doLogin(email, password, type));
    const res = await authApi.login(email, password, type);
    if (res.returnCode === 1) {
      await cookies.set('MY_TOKEN', res.data.token);
      await cookies.set('CURR_USER', res.data.user);
      resolve(dispatch(doLoginSuccess(res.data.user)));
    } else {
      reject(dispatch(doLoginFail(res.returnMessage)));
    }
  });

export const logout = () => async (dispatch) => {
  dispatch(doLogout());
  await cookies.set('CURR_USER', '');
  await cookies.set('MY_TOKEN', '');
};

export const updateUserInfo = userData => dispatch =>
  new Promise(async (resolve, reject) => {
    const user = cookies.get('CURR_USER');
    const res = await authApi.updateInfo(userData, user.type);
    if (res.returnCode === 1) {
      await cookies.set('CURR_USER', { ...res.data, type: user.type });
      resolve(dispatch(doLoginSuccess(res.data)));
    } else {
      reject(dispatch(doLoginFail(res.returnMessage)));
    }
    window.location.reload();
  });
