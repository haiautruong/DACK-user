import axios from 'axios';
import { API_URL } from '../constant';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('MY_TOKEN');

const changePass = (email, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_URL}/private/students/changepassword/${email}`,
      data: {
        oldPassword,
        newPassword
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  changePass
};
