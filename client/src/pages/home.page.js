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

const HomePage = ({ setshowLayout, user, logout }) => {
  const [tutors, setTutors] = useState([]);
  const [skills, setSkills] = useState([]);

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
    homeApi
      .getSkills()
      .then(result => {
        if (result.returnCode === 1) {
          setSkills(result.data.skills);
        }
      })
      .catch(error => {
        console.log('error get list tutor', error);
      });
  }, []);
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
        <Col span={24}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Search"
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
              <Option key={skill.skillID}>{skill.skillName}</Option>
            ))}
          </Select>
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
