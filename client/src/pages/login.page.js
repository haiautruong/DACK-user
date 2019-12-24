/* eslint-disable react/prop-types */

import React, {useEffect} from 'react';
import {withRouter,useLocation, useHistory} from 'react-router-dom';
import { authHook } from '../hooks';
// import { useTranslation } from 'react-i18next';
import Login from '../components/Login';
import ReactGA from 'react-ga';
const LoginPage = ({ setshowLayout }) => {
  const location = useLocation();
  const history = useHistory();

  authHook(history);
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

  useEffect(()=> {
    ReactGA.pageview('/login');
  }, []);
  return (
    <div className="main">
      <Login />
    </div>
  );
};

export default withRouter(LoginPage);
