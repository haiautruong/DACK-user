import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Checkbox } from 'antd';
import { login } from '../reducers/auth.reducer';
import { useHistory } from 'react-router-dom';

const Login = ({ i18n, login }) => {
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(2);
  const history = useHistory();

  const handleOnchange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async () => {
    console.log(email, password, type);
    const res = await login(email, password, type);
    console.log('res login', res);
    if (res) {
      history.push('/');
    } else {
      console.log('fail');
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
    console.log('login FB');
  };

  const onLoginGG = () => {
    console.log('login GG');
  };

  return (
    <div className="container-wrapper">
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
            <label className="icon" htmlFor="your_name">
              <Icon type="user" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              type="text"
              name="email"
              placeholder="Your Email"
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
