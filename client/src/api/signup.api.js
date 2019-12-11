import axios from 'axios';
import { API_URL } from '../constant';

const signup = user => {
  console.log('user', user);
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_URL}/signup`,
      data: {
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        type: user.type
      }
    })
      .then(result => {
        console.log('result', result);
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  signup
};
