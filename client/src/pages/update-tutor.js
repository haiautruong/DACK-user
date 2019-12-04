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
    <Layout>
      <Header>
        Header
      </Header>
      <Layout>
        

      <Sider>
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
  
        
      </Sider>
      
        <Content>
          <h1>           Hello TUTOR</h1>
        </Content>
      </Layout>
      <Footer>
        Footer
      </Footer>
    </Layout>
  );
}

export default withRouter(UpdateTutor);