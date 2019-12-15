/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Button, Icon, Layout, Menu, Row, Col, Card } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import { renderStar, formatCurrency, renderTags } from '../utils/helper';
import { studentApi } from '../api';

import UpdateInfoForm from '../components/student/profile';

const cookies = new Cookies();

const { Sider } = Layout;
const grid33 = {
  width: '33.33%',
  boxShadow: 'none'
};
const grid100 = {
  width: '100%',
  boxShadow: 'none'
};

const StudentProfile = ({ setshowLayout }) => {
  const [student, setStudent] = useState({});
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  const history = useHistory();

  const currUser = cookies.get('CURR_USER');

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
    setStudent(currUser);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ background: '#001529' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
        <UpdateInfoForm user={student} setIsShowUpdate={setIsShowUpdate} />
      </div>
    </div>
  );
};

export default withRouter(StudentProfile);
