import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage, LoginPage, SignUpPage, UpdateTutor } from './pages';
import { Layout, Menu, Icon, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cookies } from 'react-cookie';
import logo from './assets/logo.png';
import SliderShow from './components/SliderShow';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const cookies = new Cookies();
const AppRouter = () => {
  const { t, i18n } = useTranslation();
  const [showLayout, setshowLayout] = useState(true);
  const user = cookies.get('CURR_USER');
  console.log(user);
  return (
    <Router>
      <Layout>
        <Header className={`${showLayout ? '' : 'hide'}`}>
          <SliderShow />
          <Link to="/login">
            <Button className="btn-signin" type="primary" size="large">
              {user ? 'Logout' : 'Sign in'}
            </Button>
          </Link>
        </Header>
        <Layout className="content-wrapper">
          <Sider className={`${showLayout ? '' : 'hide'}`}>
            <figure>
              <img className="app-logo" src={logo} alt="logo" />
            </figure>
            <Menu defaultSelectedKeys={['/']} mode="inline" theme="light">
              <Menu.Item key="/">
                <Link to="/">
                  <Icon type="layout" />
                  <span>{t('overview')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/user">
                <Link to="/user">
                  <Icon type="usergroup-add" />
                  <span>{t('user')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/skills">
                <Link to="/skills">
                  <Icon type="thunderbolt" />
                  <span>{t('skills')}</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
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
            </Switch>
          </Content>
        </Layout>
        <Footer className={`${showLayout ? '' : 'hide'}`}>
          &copy; Copyright - HCMUS-2019
        </Footer>
      </Layout>
    </Router>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
