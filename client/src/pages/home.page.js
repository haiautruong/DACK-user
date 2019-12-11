import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { Col, Row, Select } from 'antd';
import { logout } from '../reducers/auth.reducer';
import { homeApi } from '../api';
import CardTutor from '../components/CardTutor';
import SkillFilter from '../components/filter/SkillFilter';
import PlaceFilter from '../components/filter/PlaceFilter';
import PriceFilter from '../components/filter/PriceFilter';

const { Option } = Select;

// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from '../components';

const HomePage = ({ setshowLayout, user, logout }) => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutor] = useState([]);

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
          setFilteredTutor(result.data.tutors);
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

  const handleChangeSkillFilter = selectedSkills => {
    if (selectedSkills.length === 0) {
      setFilteredTutor(tutors);
      return;
    }

    let result = [];
    for (let s of selectedSkills) {
      for (let t of tutors) {
        if (!result.includes(t) && t.skills.includes(s)) result.push(t);
      }
    }
    setFilteredTutor(result);
  };

  const handleChangePlaceFilter = selectedPlaces => {
    if (selectedPlaces.length === 0) {
      setFilteredTutor(tutors);
      return;
    }

    let result = [];
    for (let s of selectedPlaces) {
      for (let t of tutors) {
        if (!result.includes(t) && t.canTeachingPlaces.includes(s))
          result.push(t);
      }
    }
    setFilteredTutor(result);
  };

  const handleChangePriceFilter = values => {
    const startPrice = values[0] * 1000;
    const endPrice = values[1] * 1000;
    let result = [];
    for (let t of tutors) {
      if (t.pricePerHour >= startPrice && t.pricePerHour <= endPrice)
        result.push(t);
    }

    setFilteredTutor(result);
  };

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
        <Col span={8}>
          <SkillFilter skills={skills} handleChange={handleChangeSkillFilter} />
        </Col>
        <Col span={8}>
          <PlaceFilter handleChange={handleChangePlaceFilter} />
        </Col>
        <Col span={8}>
          <PriceFilter handleChange={handleChangePriceFilter} />
        </Col>
      </Row>
      <Row className="container-tutors">{renderListTutor(filteredTutors)}</Row>
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
