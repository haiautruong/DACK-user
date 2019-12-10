import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter, useLocation, Link } from 'react-router-dom';
import { Row, Select, Avatar, Menu, Dropdown, Col, Icon, Result } from 'antd';
import { logout } from '../reducers/auth.reducer';
import { homeApi } from '../api';
import CardTutor from '../components/CardTutor';
const { Option } = Select;

// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from '../components';

const skills = [
  'C++',
  'C#',
  'Java',
  'Math',
  'Physic',
  'Chemistry',
  'React',
  'Node',
  'Angular'
];

const HomePage = ({ setshowLayout, user, logout }) => {
  const [tutors, setTutors] = useState([]);
  let history = useHistory();
  const location = useLocation();
  useEffect(() => {
    async function checkLocation() {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        await setshowLayout(false);
      } else {
        await setshowLayout(true);
      }
    }
    checkLocation();
    homeApi
      .getListTutors()
      .then(result => {
        if (result.returnCode === 1) {
          setTutors(result.data.tutors);
        }
      })
      .catch(error => {
        console.log('error get list tutor', error);
      });
  });
  const linkToSignIn = e => {
    if (user) {
      logout();
    }

    history.push('/login');
  };

  const handleChange = () => {};
  const renderListTutor = (list = []) => {
    return list.map((element, key) => {
      return (
        <Col key={key} span={6}>
          <CardTutor {...element} />
        </Col>
      );
    });
  };

  return (
    <div className="home-page">
      <Row className="content-header">
        <Col span={20}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Search"
            defaultValue={['C++', 'C#']}
            renderSelectValue={selected =>
              selected.map(item => {
                console.log(item);
              })
            }
            onChange={handleChange}
            size="large"
            // optionLabelProp="label"
          >
            {skills.map(skill => (
              <Option key={skill}>{skill}</Option>
            ))}
          </Select>
        </Col>
        <Col className="avartar-container" span={4}>
          <Avatar shape="square" size="large" src={user ? user.avatar : ''} />
          <Dropdown
            className="avatar-username"
            overlay={() => (
              <Menu>
                <Menu.Item key="0">
                  <Link to="/">My Profile</Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <Link href="/">Settings</Link>
                </Menu.Item>
              </Menu>
            )}
            trigger={['click']}
          >
            <a className="ant-dropdown-link" href="#">
              {user ? user.fullName : ''} <Icon type="down" />
            </a>
          </Dropdown>
        </Col>
      </Row>
      <Row className="container-tutors">{renderListTutor(tutors)}</Row>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
