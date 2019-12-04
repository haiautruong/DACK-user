import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, Checkbox } from 'antd';
import { useInput } from '../hooks';
import * as _ from 'lodash';
import { signupApi } from '../api';
import { login } from '../reducers/auth.reducer';

import { useHistory } from 'react-router-dom';

const SignUp = ({ i18n, login }) => {
  const [type, setType] = useState(2);
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
      document.getElementById('email').classList.add('invalid');
      isYes = true;
    }

    if (_.isEmpty(password) || !_.isEqual(password, repeatPassword)) {
      document.getElementById('password').classList.add('invalid');
      document.getElementById('repeatPassword').classList.add('invalid');
      isYes = true;
    }

    return isYes;
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const user = {
      fullName,
      email,
      password,
      address,
      phoneNumber: phone,
      type
    };

    console.log(!notifyInvalid());

    if (!notifyInvalid()) {
      console.log('all valid');
      signupApi.signup(user).then(async response => {
        console.log(response);
        if (response.returnCode === 1) {
          const res = await login(email, password, type);
          if (res) {
            history.push('/');
          } else {
            console.log('Auto login fail');
          }
        } else {
          document.getElementsByClassName('notify')[0].classList.remove('hide');
        }
      });
    }
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
      <div className="signup-content">
        <div className="signup-form">
          <h2 className="form-title">Sign up</h2>
          <span className="notify hide">Your email already exist !</span>
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
            <Checkbox onChange={e => onCheckBox(e)}>I'm a tutor</Checkbox>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: (username, password, type) => dispatch(login(username, password, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
