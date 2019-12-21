import axios from 'axios';
import { API_URL } from '../constant';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('MY_TOKEN');
const getTutor = email => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${API_URL}/public/teachers/${email}`
    })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const changePass = (email, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_URL}/private/teachers/changepassword/${email}`,
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

const getListContracts = email => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${API_URL}/private/contracts/teacher/${email}`,
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

const getListConversation = email => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${API_URL}/private/conversations/teacher/${email}`,
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
  getTutor,
  changePass,
  getListContracts,
  getListConversation
};
