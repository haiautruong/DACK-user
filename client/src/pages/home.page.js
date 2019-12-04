import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from '../components';
const HomePage = ({ i18n, t }) => {
  let history = useHistory();
  const linkToSignIn = () => {
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
        Sign in
      </Button>

      {/* <LanguageToggle i18n={i18n} />
      <h1>{t('greeting')}</h1> */}
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
