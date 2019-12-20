import React, { useEffect } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import FormContract from '../../components/student/formContract';
import { Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

const { Sider } = Layout;
const cookies = new Cookies();
const SettingContract = ({ setshowLayout }) => {
  const history = useHistory();
  const currTutor = cookies.get('CURR_TUTOR');

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
  }, []);

  const navigation = key => {
    if (key === '1') {
      history.push('/student-profile');
    } else if (key === '2') {
      history.push('/policy');
    }
  };

  if (_.isEmpty(currTutor)) {
    history.push('/');
    return null;
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ background: '#001529' }}>
          <Sider breakpoint="lg" collapsedWidth="0">
            <Menu
              theme="dark"
              mode="inline"
              onSelect={({ key }) => navigation(key)}
            >
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">Personal Info</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="book" />
                <span className="nav-text">Your policy</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="message" />
                <span className="nav-text">Conversation</span>
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
        <div className="container-info">
          <FormContract tutor={currTutor} />
        </div>
      </div>
    );
  }
};

SettingContract.propTypes = {
  setshowLayout: PropTypes.func
};

export default withRouter(SettingContract);
