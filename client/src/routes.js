import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage, LoginPage, SignUpPage, UpdateTutor } from './pages';
import { Layout, Menu, Icon, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cookies } from 'react-cookie';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const cookies = new Cookies();
const AppRouter = () => {
  const { t, i18n } = useTranslation();
  const [showLayout, setshowLayout] = useState(true);
  const user = cookies.get('CURR_USER');
  return (
    <Router>
      <div className=''>
        <Layout>
          <Header className={`${showLayout ? '' : 'hide'}`}>
            <Link to='/login'>
              <Button
                className="btn-signin"
                type="primary"
                size="large"
              >
                {user ? 'Logout' : 'Sign in'}
              </Button>
            </Link>
            

            {/* <LanguageToggle i18n={i18n} />
            <h1>{t('greeting')}</h1> */}
          </Header>
          <Layout className='content-wrapper'>
            <Sider className={`${showLayout ? '' : 'hide'}`}>
              Sider
            </Sider>
            <Content>
              <Switch>
                <Route exact path="/login">
                  <LoginPage t={t} i18n={i18n} setshowLayout={setshowLayout}/>
                </Route>
                <Route exact path="/signup">
                  <SignUpPage t={t} i18n={i18n} setshowLayout={setshowLayout}/>
                </Route>
                <Route exact path="/">
                  <HomePage t={t} i18n={i18n} setshowLayout={setshowLayout}/>
                </Route>
                <Route exact path="/update-tutor" >
                  <UpdateTutor setshowLayout={setshowLayout}/>
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
