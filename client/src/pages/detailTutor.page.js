/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import {
  renderStar,
  formatCurrency,
  renderTags,
  formatStatus
} from '../utils/helper';
import { Row, Card, Col, Button } from 'antd';
import { tutorApi, chatApi } from '../api';
import { Cookies } from 'react-cookie';
import * as _ from 'lodash';

const cookies = new Cookies();
const DetailTutorPage = ({ setshowLayout }) => {
  const [tutor, setTutor] = useState({});
  const [historyTeaching, setHistoryTeaching] = useState([]);
  let { email } = useParams();
  const history = useHistory();
  const currUser = cookies.get('CURR_USER');

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
          setHistoryTeaching(result.data.contracts);
        }
      })
      .catch(error => {
        console.log('error get list tutor', error);
      });
  }, []);

  const renderHistory = list => {
    return list.map((item, index) => {
      return (
        <li key={index}>
          <span>{`${item.startDate} - ${item.endDate}: ${item.subject}`}</span>
          <span>{formatStatus(item.status)}</span>
        </li>
      );
    });
  };

  const linkToSettingContract = () => {
    cookies.set('CURR_TUTOR', tutor);
    history.push('/setting-contract');
  };

  const linkToSettingChat = () => {
    chatApi.getConversation(email, currUser.email).then(res => {
      if (res.returnCode === 1) {
        history.push('/conversation');
      }
    });
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
            cover={
              <img
                alt=""
                src={
                  tutor.avatar && tutor.avatar !== 'undefined'
                    ? tutor.avatar
                    : 'https://www.speakingtigerbooks.com/wp-content/uploads/2017/05/default-avatar.png'
                }
              />
            }
            bordered={false}
          >
            <div>{renderStar(tutor.rating)}</div>
            {currUser && currUser.type === 2 && (
              <div>
                <div>
                  <Button
                    className="btn-register"
                    style={{ width: '100%' }}
                    size="large"
                    onClick={linkToSettingContract}
                  >
                    Register
                  </Button>
                </div>
                <div>
                  <Button
                    className="btn-register"
                    style={{ width: '100%', marginTop: 10 }}
                    size="large"
                    onClick={linkToSettingChat}
                  >
                    Conversation
                  </Button>
                </div>
              </div>
            )}
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
              <div className="value">
                {tutor.skills && tutor.skills.length !== 0
                  ? renderTags(tutor.skills)
                  : 'Updating...'}
              </div>
              <p className="text-small">Teaching places</p>
              <div className="value">
                {tutor.canTeachingPlaces && tutor.canTeachingPlaces.length !== 0
                  ? renderTags(tutor.canTeachingPlaces, false)
                  : 'Updating...'}
              </div>
            </Card.Grid>
            <Card.Grid hoverable={false} style={grid33}>
              <p className="text-small">Teaching history</p>
              {!_.isEmpty(historyTeaching) ? (
                <div className="history-list">
                  <ul>{renderHistory(historyTeaching)}</ul>
                </div>
              ) : (
                <span className="no-history">No history teaching found</span>
              )}
            </Card.Grid>
            <Card.Grid hoverable={false} style={grid100}>
              <p className="text-small">Self description</p>
              <div>
                {tutor.selfDescription ? tutor.selfDescription : 'Updating...'}
              </div>
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

const mapDispatchToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailTutorPage)
);
