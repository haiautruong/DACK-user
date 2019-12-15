/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Icon, Layout, Menu} from 'antd';
import { useHistory, withRouter } from 'react-router-dom';

import UpdateInfoForm from '../components/student/profile';

const cookies = new Cookies();

const { Sider } = Layout;

const StudentProfile = ({ setshowLayout }) => {
  const [student, setStudent] = useState({});

  const history = useHistory();

  const currUser = cookies.get('CURR_USER');

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
    setStudent(currUser);
  }, []);

  const navigation = key => {
    if (key === '1') {
      history.push('/student-profile');
    } else if (key === '2') {
      history.push('/policy');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ background: '#001529' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
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
      <div>
        <UpdateInfoForm user={student} />
      </div>
    </div>
  );
};

export default withRouter(StudentProfile);
