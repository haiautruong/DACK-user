/* eslint-disable react/prop-types */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Cookies} from 'react-cookie';
const cookies = new Cookies();


const StudentRoute = ({component: Component, redirect, setshowLayout }) => {
  const user = cookies.get('CURR_USER');
  return (
    <Route>
      {
        user.type === 2 ? 
          <Component setshowLayout={setshowLayout}/>
          :
          <Redirect to={redirect}/>
      }
    </Route>
  );
};

export default StudentRoute;