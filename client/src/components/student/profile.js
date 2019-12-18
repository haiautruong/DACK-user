/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Icon, Input, Row } from 'antd';
import AvatarUpload from '../teacher/AvatarUpload';
import ModalChangePass from '../ModalChangePass';
import { updateUserInfo } from '../../reducers/auth.reducer';
import { useHistory } from 'react-router-dom';

const UpdateInfoForm = ({ user }) => {
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [showModalChangePass, setShowModalChangePass] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setPhoneNumber(user.phoneNumber);
    setAvatar(user.avatar);
    setFullName(user.fullName);
    setAddress(user.address);
    setEmail(user.email);
  }, [
    user.phoneNumber,
    user.avatar,
    user.fullName,
    user.fullName,
    user.address
  ]);
  const updateInfo = async () => {
    // console.log('avatar', avatarFile.originFileObj);

    const data = {
      email: user.email,
      fullName,
      address,
      phoneNumber,
      avatarFile
    };

    dispatch(updateUserInfo(data));
    window.location.reload();
  };

  const cancel = () => {
    history.push('/');
  };

  useEffect(() => {}, []);

  return (
    <Row className="container-tutors">
      <Col span={5}>
        <AvatarUpload
          avatar={
            avatar ||
            'https://www.speakingtigerbooks.com/wp-content/uploads/2017/05/default-avatar.png'
          }
          setAvatar={setAvatar}
          setFile={setAvatarFile}
        />
        <Button
          onClick={() => setShowModalChangePass(true)}
          block
          className="btn-register"
        >
          Change Password ?
        </Button>
        <ModalChangePass
          isOpen={showModalChangePass}
          setShowModalChangePass={setShowModalChangePass}
          currPass={''}
          type={2}
          email={user.email}
        />
      </Col>
      <Col span={18} offset={1}>
        <span>Email</span>
        <Input
          style={{ marginBottom: 12 }}
          prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          name="email"
          type="text"
          value={email}
          disabled
        />
        <span>Full name</span>
        <Input
          style={{ marginBottom: 12 }}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          name="fullName"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Họ tên"
        />
        <span>Address</span>
        <Input
          style={{ marginBottom: 12 }}
          prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
          name="address"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Address"
        />
        <span>Phone number</span>
        <Input
          style={{ marginBottom: 12 }}
          prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
          name="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="Address"
        />
        <Button
          className="button-shadow"
          style={{ float: 'right', marginTop: '5px', marginLeft: 5 }}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          className="button-shadow"
          style={{ float: 'right', marginTop: '5px' }}
          onClick={updateInfo}
        >
          Save
        </Button>
      </Col>
    </Row>
  );
};

export default UpdateInfoForm;
