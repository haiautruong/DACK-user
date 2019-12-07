import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useHistory, withRouter,useLocation } from 'react-router-dom';
import { logout } from '../reducers/auth.reducer';

// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from '../components';
const HomePage = ({ setshowLayout, user, logout }) => {
  let history = useHistory();
  const location = useLocation();
  useEffect(() => {
    async function checkLocation() {
      if(location.pathname === '/login'||location.pathname === '/signup'){
        await setshowLayout(false);
      }
      else{
        await setshowLayout(true);
      }
    }
    checkLocation();
  });
  const linkToSignIn = e => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
