/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import ReactGA from 'react-ga';
import {connect} from 'react-redux';
import {Checkbox, Icon} from 'antd';
import {useInput} from '../hooks';
import * as _ from 'lodash';
import {signupApi} from '../api';
import {login} from '../reducers/auth.reducer';

import {Link, useHistory} from 'react-router-dom';
import ModalComfirm from './ModalComfirm';

const SignUp = () => {
  const [type, setType] = useState(2);
  const [message, setMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { value: fullName, bind: bindFullName } = useInput('fullName');
  const { value: email, bind: bindEmail } = useInput('email');
  const { value: password, bind: bindPassword } = useInput('password');
  const { value: repeatPassword, bind: bindRepeatPassword } = useInput(
    'repeatPassword'
  );
  const { value: phone, bind: bindPhone } = useInput('phone');
  const { value: address, bind: bindAddress } = useInput('address');
  const history = useHistory();

  const notifyInvalid = () => {
    let isYes = false;
    if (_.isEmpty(fullName)) {
      document.getElementById('fullName').classList.add('invalid');
      isYes = true;
    }

    if (_.isEmpty(address)) {
      document.getElementById('address').classList.add('invalid');
      isYes = true;
    }

    if (_.isEmpty(phone)) {
      document.getElementById('phone').classList.add('invalid');
      isYes = true;
    }

    if (_.isEmpty(email)) {
      console.log('email empty');
      document.getElementById('email').classList.add('invalid');
      isYes = true;
    }

    if (_.isEmpty(password) || !_.isEqual(password, repeatPassword)) {
      document.getElementById('password').classList.add('invalid');
      document.getElementById('repeatPassword').classList.add('invalid');
      isYes = true;
    }

    if (
      document.getElementById('email').classList.contains('invalid') ||
      document.getElementById('fullName').classList.contains('invalid') ||
      document.getElementById('phone').classList.contains('invalid') ||
      document.getElementById('address').classList.contains('invalid') ||
      document.getElementById('repeatPassword').classList.contains('invalid') ||
      document.getElementById('password').classList.contains('invalid')
    ) {
      isYes = true;
    }
    return isYes;
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!document.getElementsByClassName('notify')[0].classList.contains('hide')){
      document.getElementsByClassName('notify')[0].classList.add('hide');
    }

    const user = {
      fullName,
      email,
      password,
      address,
      phoneNumber: phone,
      type
    };

    if (!notifyInvalid()) {
      ReactGA.event({
        category:'Signup',
        action: 'Click Signup'
      });

      signupApi.signup(user).then(async response => {
        if (response.returnCode === 1) {
          setModalOpen(true);
        } else {
          ReactGA.event({
            category:'Signup',
            action: 'Signup Failed'
          });
          setMessage(response.returnMessage);
          document.getElementsByClassName('notify')[0].classList.remove('hide');
        }
      });
    }
  };

  const signUpSuccess = (isOpenModal) => {
    ReactGA.event({
      category:'Signup',
      action: 'Signup Succeed'
    });
    setModalOpen(isOpenModal);
    history.push('/login');
  };

  const onCheckBox = e => {
    if (e.target.checked) {
      setType(1);
    } else {
      setType(2);
    }
  };

  return (
    <div className="container-wrapper">
      <ModalComfirm open={modalOpen}
        setOpenComfirm={signUpSuccess}
        message="Tạo tài khoản thành công. Vui lòng kích hoạt tài khoản qua email."/>

      <Link to="/">
        <Icon className="icon-home" type="home" />
      </Link>
      <div className="signup-content">
        <div className="signup-form">
          <h2 className="form-title">Sign up</h2>
          <span className="notify hide">{message}</span>
          <div className="form-group">
            <label className="icon">
              <Icon type="user" />
            </label>
            <input
              {...bindFullName}
              id="fullName"
              type="text"
              placeholder="Your Full Name"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="mail" />
            </label>
            <input
              {...bindEmail}
              type="email"
              placeholder="Your Email"
              id="email"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="lock" />
            </label>
            <input
              {...bindPassword}
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="lock" />
            </label>
            <input
              {...bindRepeatPassword}
              type="password"
              placeholder="Repeat your password"
              id="repeatPassword"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="home" />
            </label>
            <input
              {...bindAddress}
              type="text"
              placeholder="Address"
              id="address"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="phone" />
            </label>
            <input
              {...bindPhone}
              type="text"
              placeholder="Your phone"
              id="phone"
            />
          </div>
          <div className="form-group check-box-wrapper">
            <Checkbox onChange={e => onCheckBox(e)}>{'I"m a tutor'}</Checkbox>
          </div>
          <div className="form-group form-button">
            <input
              onClick={handleSubmit}
              type="submit"
              className="form-submit"
              value="Register"
            />
          </div>
        </div>
        <div className="signup-image">
          <figure>
            <img src="images/signup-image.jpg" alt="sing-up" />
          </figure>
          <a href="/login" className="signup-image-link">
            I am already member
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  login: (username, password, type) => dispatch(login(username, password, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
