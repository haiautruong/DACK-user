/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Button, Card, Col, Icon, Layout, Menu, Row } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import { formatCurrency, renderStar, renderTags } from '../utils/helper';
import { tutorApi } from '../api';

import UpdateInfoForm from '../components/teacher/UpdateInfoForm';

const cookies = new Cookies();
const currUser = cookies.get('CURR_USER');

const { Sider } = Layout;
const grid5 = {
  width: '50%',
  boxShadow: 'none'
};
const grid100 = {
  width: '100%',
  boxShadow: 'none'
};

const UpdateTutor = ({ setshowLayout }) => {
  const [tutor, setTutor] = useState(currUser);
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
    tutorApi
      .getTutor(currUser.email)
      .then(result => {
        if (result.returnCode === 1) {
          setTutor(result.data);
        }
      })
      .catch(error => {
        console.log('error get list tutor', error);
      });

    if (tutor.type === 2) {
      history.push('/');
    }
  }, []);

  const navigation = key => {
    if (key === '1') {
      history.push('/teacher-profile');
    } else if (key === '2') {
      history.push('/policy');
    }
  };

  console.log('skills', tutor.skills, 'places', tutor.canTeachingPlaces);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ background: '#001529' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
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
              <Icon type="history" />
              <span className="nav-text">Teaching History</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="message" />
              <span className="nav-text">Conversation</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
      <div style={{ width: '100%', padding: 10, overflow: 'auto' }}>
        {isShowUpdate ? (
          <UpdateInfoForm user={tutor} setIsShowUpdate={setIsShowUpdate} />
        ) : (
          <Row>
            <Col span={6}>
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
                      tutor.avatar ||
                      'https://www.speakingtigerbooks.com/wp-content/uploads/2017/05/default-avatar.png'
                    }
                  />
                }
                bordered={false}
              >
                <div>{renderStar(tutor.rating)}</div>
                <div>
                  <Button
                    className="btn-register"
                    style={{ width: '100%' }}
                    size="large"
                    onClick={() => setIsShowUpdate(true)}
                  >
                    Update Your Info
                  </Button>
                </div>
              </Card>
            </Col>
            <Col style={{ height: '100%' }} span={18}>
              <Card
                bordered={false}
                style={{ width: '100%', height: 'calc(100vh - 130px)' }}
                title="Information"
              >
                <Card.Grid hoverable={false} style={grid5}>
                  <p className="text-small">Fullname</p>
                  <div className="value">{tutor.fullName}</div>
                  <p className="text-small">Phone</p>
                  <div className="value">{tutor.phoneNumber}</div>
                  <p className="text-small">Address</p>
                  <div className="value">{tutor.address}</div>
                  <p className="text-small">Email</p>
                  <div className="value">{tutor.email}</div>
                </Card.Grid>
                <Card.Grid hoverable={false} style={grid5}>
                  <p className="text-small">Price per hour</p>
                  <div className="value">
                    {tutor.pricePerHour ? (
                      formatCurrency(tutor.pricePerHour)
                    ) : (
                      <span className="notify">Need to update</span>
                    )}
                  </div>
                  <p className="text-small">Skills</p>
                  <div className="value">
                    {tutor.skills && tutor.skills.length !== 0 ? (
                      renderTags(tutor.skills)
                    ) : (
                      <span className="notify">Need to update</span>
                    )}
                  </div>
                  <p className="text-small">Teaching places</p>
                  <div className="value">
                    {tutor.canTeachingPlaces &&
                    tutor.canTeachingPlaces.length !== 0 ? (
                      renderTags(tutor.canTeachingPlaces, false)
                    ) : (
                      <span className="notify">Need to update</span>
                    )}
                  </div>
                </Card.Grid>
                <Card.Grid hoverable={false} style={grid100}>
                  <p className="text-small">Self description</p>
                  <div>
                    {tutor.selfDescription ? (
                      tutor.selfDescription
                    ) : (
                      <span className="notify">Need to update</span>
                    )}
                  </div>
                </Card.Grid>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default withRouter(UpdateTutor);
