/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useLocation, withRouter} from 'react-router-dom';
import {Button, Col, Icon, Pagination, Row} from 'antd';
import {logout} from '../reducers/auth.reducer';
import {homeApi} from '../api';
import CardTutor from '../components/CardTutor';
import SkillFilter from '../components/filter/SkillFilter';
import PlaceFilter from '../components/filter/PlaceFilter';
import PriceFilter from '../components/filter/PriceFilter';
import {ITEM_PER_PAGE_HOME} from '../constant';
import {sliceArray} from '../utils/helper';
import ReactGA from "react-ga";

// const { Option } = Select;

// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from '../components';

const HomePage = ({setshowLayout}) => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(filteredTutors.length);

  const [skills, setSkills] = useState([]);

  const [isSortAsc, setIsSortAsc] = useState(true);

  const [conditionPlaces, setConditionPlaces] = useState([]);
  const [conditionSkills, setConditionSkills] = useState([]);
  const [conditionPrice, setConditionPrice] = useState([0, 200000]);

  useEffect(() => {
    applyFilter();
  }, [conditionPlaces, conditionSkills, conditionPrice]);

  // let history = useHistory();
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview('/');

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
          setTotal(result.data.tutors.length);
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

  const onChange = page => {
    setCurrentPage(page);
  };

  const handleChangeSkillFilter = selectedSkills => {
    setConditionSkills(selectedSkills);
  };

  const handleChangePlaceFilter = selectedPlaces => {
    setConditionPlaces(selectedPlaces);
  };

  const handleChangePriceFilter = values => {
    setConditionPrice(values);
  };

  const applyFilter = () => {
    let result = [];

    const startPrice = conditionPrice[0] * 2000;
    const endPrice = conditionPrice[1] * 2000;

    for (let t of tutors) {
      if (t.pricePerHour < startPrice || t.pricePerHour > endPrice) {
        continue;
      }

      let checkSkill = true;

      for (let s of conditionSkills) {
        if (!t.skills.includes(s)) {
          checkSkill = false;
          break;
        }
      }

      if (!checkSkill) {
        continue;
      }

      let checkPlaces = true;

      for (let s of conditionPlaces) {
        if (!t.canTeachingPlaces.includes(s)) {
          checkPlaces = false;
          break;
        }
      }

      if (!checkPlaces) {
        continue;
      }

      result.push(t);
    }

    setFilteredTutor(result);
    setTotal(result.length);
  };

  const applySort = () => {
    const asc = (a, b) => {
      return a.pricePerHour - b.pricePerHour;
    };

    const desc = (a, b) => {
      return b.pricePerHour - a.pricePerHour;
    };

    filteredTutors.sort(isSortAsc ? asc : desc);
    setIsSortAsc(!isSortAsc);
  };

  const renderListTutor = (list = [], page) => {
    const start = (page - 1) * ITEM_PER_PAGE_HOME;
    const end = start + ITEM_PER_PAGE_HOME;
    const subList = sliceArray(list, start, end);
    return subList.map((element, key) => {
      return (
        <Col className="col" key={key} xs={12} md={8} xl={6}>
          <CardTutor {...element} />
        </Col>
      );
    });
  };

  return (
    <div className="home-page">
      <Row className="content-header">
        <Col span={7}>
          <SkillFilter skills={skills} handleChange={handleChangeSkillFilter}/>
        </Col>
        <Col span={7}>
          <PlaceFilter handleChange={handleChangePlaceFilter}/>
        </Col>
        <Col span={7}>
          <PriceFilter handleChange={handleChangePriceFilter}/>
        </Col>
        <Col span={2} style={{display:'flex', alignItems: 'center'}}>
          <Button type="primary" ghost onClick={applySort}>
            {isSortAsc ? <Icon type="sort-descending" /> : <Icon type="sort-ascending" />}
                  Sort By Price
          </Button>
        </Col>
      </Row>
      <Row className="container-tutors">
        {renderListTutor(filteredTutors, currentPage)}
      </Row>
      <Pagination
        className="pagination"
        current={currentPage}
        onChange={onChange}
        total={total}
        setTotal={setTotal}
        defaultPageSize={ITEM_PER_PAGE_HOME}
      />
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
