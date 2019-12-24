/* eslint-disable react/prop-types */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Cookies} from 'react-cookie';
const cookies = new Cookies();


const TeacherRoute = ({path, component: Component, redirect, setshowLayout }) => {
  const user = cookies.get('CURR_USER');
  return (
    <Route path={path}>
      {
        user && user.type === 1 ? 
          <Component setshowLayout={setshowLayout} />
          :
          <Redirect to={redirect}/>
      }
    </Route>
  );
};

export default TeacherRoute;