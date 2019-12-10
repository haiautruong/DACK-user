import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { Layout, Menu, Icon,  } from 'antd';
import { withRouter, useHistory } from 'react-router-dom';
const { SubMenu } = Menu;
const cookies = new Cookies();

const { Header, Footer, Sider, Content } = Layout;

const UpdateTutor = () => {
  const curr_user = cookies.get('CURR_USER');
  const history =  useHistory();
  useEffect(() => {
    if(curr_user.role===2){
      history.push('/');
    }
  });

  const [current, setCurrent] = useState('mail');
  const handleClick = e => {
    console.log('click ', e);
    this.setCurrent(e.key);
  };

  return (
    <>
    HELLO TUTOR
    </>
    );
}

export default withRouter(UpdateTutor);