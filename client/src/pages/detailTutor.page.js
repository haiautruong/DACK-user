/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter, useParams } from 'react-router-dom';
import { renderStar, formatCurrency, renderTags } from '../utils/helper';
import { Row, Card, Col, Icon, Button } from 'antd';
import { tutorApi } from '../api';
const { Meta } = Card;

const DetailTutorPage = ({ setshowLayout }) => {
  const [tutor, setTutor] = useState({});
  let { email } = useParams();
  const history = useHistory();
  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
    tutorApi
      .getTutor(email)
      .then(result => {
        if (result.returnCode === 1) {
          setTutor(result.data);
        }
      })
      .catch(error => {
        console.log('error get list tutor', error);
      });
  }, []);

  const goHome = () => {
    history.push('/');
  };

  const grid33 = {
    width: '33.33%',
    boxShadow: 'none'
  };
  const grid100 = {
    width: '100%',
    boxShadow: 'none'
  };
  return (
    <div>
      <Row className="container-tutors">
        <Col span={5}>
          <Card
            style={{
              width: '100%',
              height: 'calc(100vh - 130px)',
              textAlign: 'center',
              position: 'relative'
            }}
            cover={<img alt="" src={tutor.avatar} />}
            bordered={false}
          >
            <div>{renderStar(tutor.rating)}</div>
            <div>
              <Button
                className="btn-register"
                style={{ width: '100%' }}
                size="large"
              >
                Register
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={19}>
          <Card
            bordered={false}
            style={{ width: '100%', height: 'calc(100vh - 130px)' }}
            title="Information"
          >
            <Card.Grid hoverable={false} style={grid33}>
              <p className="text-small">Fullname</p>
              <div className="value">{tutor.fullName}</div>
              <p className="text-small">Phone</p>
              <div className="value">{tutor.phoneNumber}</div>
              <p className="text-small">Address</p>
              <div className="value">{tutor.address}</div>
              <p className="text-small">Email</p>
              <div className="value">{tutor.email}</div>
            </Card.Grid>
            <Card.Grid hoverable={false} style={grid33}>
              <p className="text-small">Price per hour</p>
              <div className="value">{formatCurrency(tutor.pricePerHour)}</div>
              <p className="text-small">Skills</p>
              <div className="value">{renderTags(tutor.skills)}</div>
              <p className="text-small">Teaching places</p>
              <div className="value">
                {renderTags(tutor.canTeachingPlaces, false)}
              </div>
            </Card.Grid>
            <Card.Grid hoverable={false} style={grid100}>
              <p className="text-small">Self description</p>
              <div>{tutor.selfDescription}</div>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailTutorPage)
);
