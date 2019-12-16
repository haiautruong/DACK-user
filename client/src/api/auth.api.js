import axios from 'axios';
import { Cookies } from 'react-cookie';

const API_URL = 'http://localhost:3004';

const login = (email, password, type) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_URL}/login`,
      data: {
        email,
        password,
        type
      },
      headers: {
        'Content-Type': 'application/json'
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

const updateInfo = userData => {
  const cookies = new Cookies();
  const token = cookies.get('MY_TOKEN');

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/private/teachers/${userData.get('email')}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 20000
      })
      .then(data => resolve(data.data))
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  login,
  updateInfo
};
