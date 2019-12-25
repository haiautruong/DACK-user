import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HomePage,
  LoginPage,
  SignUpPage,
  UpdateTutor,
  DetailTutor,
  StudentProfile,
  ListPolicies,
  SettingContract,
  Statistics
} from './pages';
import { Row, Col, Layout, Menu, Icon, Button, Avatar, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cookies } from 'react-cookie';
import SliderShow from './components/SliderShow';
import { TeacherRoute, StudentRoute } from './components';
import Conversation from './pages/conversation.page';

const { Header, Footer, Content } = Layout;
const cookies = new Cookies();

const AppRouter = () => {
  const { t, i18n } = useTranslation();
  const [showLayout, setshowLayout] = useState(false);
  const user = cookies.get('CURR_USER');
  return (
    <Router>
      <Layout>
        <Header
          style={{ paddingLeft: 20 }}
          className={`${showLayout ? '' : 'hide'}`}
        >
          <Row>
            <Col span={7}>
              <Link to="/">
                <img className="logo" alt="" src="/images/logo.png" />
              </Link>
            </Col>
            <Col span={9}>
              <SliderShow />
            </Col>
            <Col span={8}>
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
                        <Link
                          to={
                            user.type === 1
                              ? '/teacher-profile'
                              : '/student-profile'
                          }
                        >
                          My Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link
                          onClick={async () =>
                            await cookies.set('CURR_USER', '')
                          }
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
            </Col>
          </Row>
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
              <TeacherRoute
                path="/teacher-profile"
                component={UpdateTutor}
                setshowLayout={setshowLayout}
                redirect={'/'}
              />
              <TeacherRoute
                path="/statistics"
                component={Statistics}
                setshowLayout={setshowLayout}
                redirect={'/'}
              />
              <StudentRoute
                path="/student-profile"
                component={StudentProfile}
                setshowLayout={setshowLayout}
                redirect={'/'}
              />
              <StudentRoute
                path="/setting-contract"
                component={SettingContract}
                setshowLayout={setshowLayout}
                redirect={'/'}
              />
              <Route exact path="/policy">
                <ListPolicies setshowLayout={setshowLayout} />
              </Route>
              <Route exact path="/detail-tutor/:email">
                <DetailTutor setshowLayout={setshowLayout} />
              </Route>
              <Route exact path="/conversation">
                <Conversation setshowLayout={setshowLayout} />
              </Route>
            </Switch>
          </Content>
        </Layout>
        <Footer
          className={`${showLayout ? '' : 'hide'}`}
          style={{ padding: '12px 20px' }}
        >
          <div style={{ float: 'left' }}>
            <ul className="footer-contact">
              <li>
                {' '}
                <Icon type="home" /> 227 Nguyen Van Cu Stress, Ward 4, District
                5, HCM city
              </li>
              <li>
                {' '}
                <Icon type="phone" /> 028 6288 4499
              </li>
            </ul>
          </div>
        </Footer>
      </Layout>
    </Router>
  );
};

export default connect()(AppRouter);
