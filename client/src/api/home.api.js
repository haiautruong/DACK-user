import axios from 'axios';
import { API_URL } from '../constant';

const getListTutors = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${API_URL}/public/teachers`
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
  getListTutors
};
