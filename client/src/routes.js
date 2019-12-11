import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  UpdateTutor,
  DetailTutor
} from './pages';
import { Layout, Menu, Icon, Button, Avatar, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cookies } from 'react-cookie';
import logo from './assets/logo.png';
import SliderShow from './components/SliderShow';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const cookies = new Cookies();
const AppRouter = () => {
  const { t, i18n } = useTranslation();
  const [showLayout, setshowLayout] = useState(false);
  const user = cookies.get('CURR_USER');
  return (
    <Router>
      <Layout>
        <Header className={`${showLayout ? '' : 'hide'}`}>
          <SliderShow />
          <div className={`user ${user ? '' : 'hide'}`} id="user-control">
            <Avatar
              shape="square"
              size="large"
              src={user ? user.avatar : null}
            />
            <Dropdown
              className="avatar-username"
              overlay={() => (
                <Menu>
                  <Menu.Item key="0">
                    <Link to="/">My Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link to="/">Settings</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link
                      onClick={async () => {
                        await cookies.set('CURR_USER', '');
                      }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu>
              )}
              trigger={['click']}
            >
              <a className="ant-dropdown-link" href="#">
                {user ? user.fullName : ''} <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <Link to="/login" className={user ? 'hide' : ''}>
            <Button className="btn-signin" type="primary" size="large">
              Sign in
            </Button>
          </Link>
        </Header>
        <Layout className="content-wrapper">
          <Content>
            <Switch>
              <Route exact path="/login">
                <LoginPage t={t} i18n={i18n} setshowLayout={setshowLayout} />
              </Route>
              <Route exact path="/signup">
                <SignUpPage t={t} i18n={i18n} setshowLayout={setshowLayout} />
              </Route>
              <Route exact path="/">
                <HomePage t={t} i18n={i18n} setshowLayout={setshowLayout} />
              </Route>
              <Route exact path="/update-tutor">
                <UpdateTutor setshowLayout={setshowLayout} />
              </Route>
              <Route exact path="/detail-tutor/:email">
                <DetailTutor setshowLayout={setshowLayout} />
              </Route>
            </Switch>
          </Content>
        </Layout>
        <Footer
          className={`${showLayout ? '' : 'hide'}`}
          style={{ textAlign: 'center', padding: '12px 50px' }}
        >
          &copy; Copyright - HCMUS-2019
        </Footer>
      </Layout>
    </Router>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
