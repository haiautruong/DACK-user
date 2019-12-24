import axios from 'axios';
import { API_URL } from '../constant';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('MY_TOKEN');

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

const getSkills = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${API_URL}/public/skills`
    })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getPolicy = async(id) => {
  const res = await fetch(`${API_URL}/private/contracts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const resData = await res.json();
  return resData;
};

const changeStatus = async (id, newStatus) => {
  const res = await fetch(`${API_URL}/private/contracts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({status: newStatus})
  });
  const resData = await res.json();
  console.log('return change', resData);
  return resData;
};

const editContract = async (id, review, rating) => {
  const res = await fetch(`${API_URL}/private/contracts/review/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({review, rating})
  });
  const resData = await res.json();
  return resData;
};

const createContract = async (data) => {
  const res = await fetch(`${API_URL}/private/contracts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  return resData;
};

const createComplaint = async (contractID, content) => {
  const res = await fetch(`${API_URL}/private/complaints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({contractID, content})
  });
  const resData = await res.json();
  return resData;
}

export default {
  getListTutors,
  getSkills,
  getPolicy,
  changeStatus,
  editContract,
  createContract,
  createComplaint
};
