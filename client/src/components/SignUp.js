import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Checkbox } from 'antd';

const SignUp = ({ i18n }) => {
  const [checked, setChecked] = useState(true);
  const onCheckBox = e => {
    console.log(e.target.checked);
  };

  const handleOnchange = e => {
    console.log(e.target.value);
  };

  const handleSignUp = () => {
    console.log('signupppp');
  };

  return (
    <div className="container-wrapper">
      <div className="signup-content">
        <div className="signup-form">
          <h2 className="form-title">Sign up</h2>
          <div className="form-group">
            <label className="icon">
              <Icon type="user" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              name="name"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="mail" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              type="email"
              name="email"
              placeholder="Your Email"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="lock" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              name="pass"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="lock" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              name="rePass"
              type="password"
              placeholder="Repeat your password"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="home" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              name="address"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label className="icon">
              <Icon type="phone" />
            </label>
            <input
              onChange={e => handleOnchange(e)}
              name="phone"
              type="text"
              placeholder="Your phone"
            />
          </div>
          <div className="form-group check-box-wrapper">
            <Checkbox onChange={e => onCheckBox(e)}>I'm a tutor</Checkbox>
          </div>
          <div className="form-group form-button">
            <input
              onClick={() => handleSignUp()}
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
