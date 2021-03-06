/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {withRouter,useLocation} from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { authHook } from '../hooks';
import SignUp from '../components/SignUp';
import {useHistory} from 'react-router-dom';
import ReactGA from 'react-ga';
const SignUpPage = ({ setshowLayout }) => {
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
    ReactGA.pageview('/signup');
  },[]);
  return (
    <div className="main">
      <SignUp />
    </div>
  );
};

export default withRouter(SignUpPage);
