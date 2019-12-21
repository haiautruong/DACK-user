import axios from 'axios';
import { API_URL } from '../constant';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('MY_TOKEN');

const getConversation = (teacherEmail, studentEmail) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${API_URL}/private/conversations?teacherEmail=${teacherEmail}&studentEmail=${studentEmail}`,
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

const createNewMessage = ({ conversationID, sender, message }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_URL}/private/conversations`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        conversationID,
        sender,
        message
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
  getConversation,
  createNewMessage
};
