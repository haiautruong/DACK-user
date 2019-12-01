import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage, LoginPage } from './pages';
import { useTranslation } from 'react-i18next';
const AppRouter = () => {
  const { t, i18n } = useTranslation();
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage t={t} i18n={i18n} />
        </Route>
        <Route path="/signup"></Route>
        <Route path="/">
          <HomePage t={t} i18n={i18n} />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
