import axios from 'axios';
const API_URL = 'http://167.179.80.90:3004';

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

export default {
  login
};
