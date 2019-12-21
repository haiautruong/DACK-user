/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const { Sider } = Layout;

const Statistics = ({ setshowLayout }) => {
  const history = useHistory();
  const user = cookies.get('CURR_USER');

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
  }, []);

  const navigation = key => {
    if (key === '1') {
      if (user.type === 1) {
        history.push('/teacher-profile');
      } else {
        history.push('/student-profile');
      }
    } else if (key === '2') {
      history.push('/policy');
    } else if (key === '3') {
      history.push('/conversation');
    } else if (key === '4') {
      history.push('/statistics');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ background: '#001529' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            onSelect={({ key }) => navigation(key)}
          >
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">Personal Info</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="book" />
              <span className="nav-text">Contracts</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="message" />
              <span className="nav-text">Conversation</span>
            </Menu.Item>
            {user.type === 1 && (
              <Menu.Item key="4">
                <Icon type="line-chart" />
                <span className="nav-text">Statistics Income</span>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
      </div>
      <div className="container-info">=,=</div>
    </div>
  );
};

export default Statistics;
