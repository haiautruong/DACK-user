import React from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import AppRouter from './routes';
import store from './store';
import './style/index.scss';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import 'antd/dist/antd.css';

ReactGA.initialize('UA-154863429-1');
ReactGA.pageview('/');

const App = () => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AppRouter />
        </I18nextProvider>
      </Provider>
    </CookiesProvider>
  );
};

export default App;
