import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { logout } from '../reducers/auth.reducer';

// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from '../components';
const HomePage = ({ i18n, t, user, logout }) => {
  let history = useHistory();

  const linkToSignIn = async e => {
    if (user) {
      logout();
    }

    history.push('/login');
  };

  return (
    <div className="home-page">
      <Button
        onClick={linkToSignIn}
        className="btn-signin"
        type="primary"
        size="large"
      >
        {user ? 'Logout' : 'Sign in'}
      </Button>

      {/* <LanguageToggle i18n={i18n} />
      <h1>{t('greeting')}</h1> */}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
