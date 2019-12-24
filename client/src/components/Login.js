/* eslint-disable no-unused-vars, react/no-unescaped-entities, react/prop-types */
import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { Button, Checkbox, Icon } from 'antd';
import { login } from '../reducers/auth.reducer';
import { useHistory, Link } from 'react-router-dom';
import * as _ from 'lodash';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import ModalResetPass from './ModalResetPass';

const Login = ({ login }) => {
  const [error, setError] = useState('');
  const [openModalResetPass, setOpenModalResetPass] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(2);
  const history = useHistory();

  const notifyInvalid = () => {
    let isYes = false;

    if (_.isEmpty(email)) {
      document.getElementById('email').classList.add('invalid');
      isYes = true;
    }

    if (_.isEmpty(password)) {
      document.getElementById('password').classList.add('invalid');
      isYes = true;
    }

    return isYes;
  };

  const handleOnchange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleLogin = () => {
    setError('');

    if (!notifyInvalid()) {
      ReactGA.event({
        category: 'Login',
        action: 'Normal Login'
      });
      login(email, password, type)
        .then(res => {
          if (type === 2) {
            history.push('/');
          } else {
            history.push('/teacher-profile');
          }
        })
        .catch(err => {
          setError(err.payload.message);
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

  const onLoginFB = () => {
    setError('');
    ReactGA.event({
      category: 'Login',
      action: 'Facebook Login'
    });

    const subWindow = window.open(
      `https://162145.online/auth/facebook/init/${type}`,
      'mywindow',
      'location=1,status=1,scrollbars=1, width=700,height=550'
    );

    window.addEventListener('message', function getData(message) {
      const { data } = message;
      if (data.returnCode) {
        window.removeEventListener('message', getData);
        if (data.returnCode === 1) {
          const cookies = new Cookies();
          cookies.set('MY_TOKEN', data.data.token);
          cookies.set('CURR_USER', data.data.user);
          if (type === 2) {
            history.push('/');
          } else {
            history.push('/teacher-profile');
          }
        } else {
          setError(data.returnMessage);
          subWindow.close();
        }
      }
    });
  };

  const onLoginGG = () => {
    setError('');
    ReactGA.event({
      category: 'Login',
      action: 'Google Login'
    });

    const subWindow = window.open(
      `https://162145.online/auth/google/init/${type}`,
      'mywindow',
      'location=1,status=1,scrollbars=1, width=700,height=550'
    );

    window.addEventListener('message', function getData(message) {
      const { data } = message;
      if (data.returnCode) {
        window.removeEventListener('message', getData);
        if (data.returnCode === 1) {
          const cookies = new Cookies();
          cookies.set('MY_TOKEN', data.data.token);
          cookies.set('CURR_USER', data.data.user);
          if (type === 2) {
            history.push('/');
          } else {
            history.push('/teacher-profile');
          }
        } else {
          setError(data.returnMessage);
          subWindow.close();
        }
      }
    });
  };

  return (
    <div className="container-wrapper">
      <Link to="/">
        <Icon className="icon-home" type="home" />
      </Link>
      <ModalResetPass
        visible={openModalResetPass}
        setVisible={setOpenModalResetPass}
      />

      <div className="signin-content">
        <div className="signin-image">
          <figure>
            <img src="images/signin-image.jpg" alt="sing-up" />
          </figure>
          <a href="/signup" className="signup-image-link">
            Create an account
          </a>
        </div>

        <div className="signin-form">
          <h2 className="form-title">Sign in</h2>
          <div className="form-group">
            <span id="notify" style={{ color: 'red' }}>
              {error}
            </span>
          </div>
          <div className="form-group">
            <label className="icon" htmlFor="your_name">
              <Icon type="user" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              type="text"
              name="email"
              placeholder="Your Email"
              id="email"
            />
          </div>
          <div className="form-group">
            <label className="icon" htmlFor="your_pass">
              <Icon type="lock" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <div className="form-group check-box-wrapper">
            <Checkbox onChange={e => onCheckBox(e)}>I'm a tutor</Checkbox>
          </div>
          <div className="form-group form-button">
            <input
              onClick={e => handleLogin(e)}
              type="submit"
              className="form-submit"
              value="Sign in"
            />
            <p
              onClick={() => setOpenModalResetPass(true)}
              className="forget-pass"
            >
              Forgot password ?
            </p>
          </div>
          <div className="social-login">
            <span className="social-label">Or sign in with</span>
            <ul className="socials">
              <li>
                <button
                  className="btn-fb"
                  type="button"
                  onClick={() => onLoginFB()}
                >
                  <i className="display-flex-center zmdi-facebook">
                    <Icon className="logo" type="facebook" />
                  </i>
                </button>
              </li>
              <li>
                <button
                  className="btn-gg"
                  type="button"
                  onClick={() => onLoginGG()}
                >
                  <i className="display-flex-center zmdi-google">
                    <Icon className="logo" type="google" />
                  </i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: (username, password, type) => dispatch(login(username, password, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
