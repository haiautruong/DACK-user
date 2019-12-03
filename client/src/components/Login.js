import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
const Login = ({ i18n }) => {
  const [checked, setChecked] = useState(true);
  const [name, setName] = useState(true);
  const [pass, setPass] = useState(true);

  const handleOnchange = e => {
    console.log(e.target.value);
  };

  const handleLogin = () => {
    console.log('login');
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
              name="name"
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <label className="icon" htmlFor="your_pass">
              <Icon type="lock" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              type="password"
              name="pass"
              placeholder="Password"
            />
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
