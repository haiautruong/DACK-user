import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Button, Icon, Layout, Menu, Row, Col, Card } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import { renderStar, formatCurrency, renderTags } from '../utils/helper';
import { tutorApi } from '../api';

import UpdateInfoForm from '../components/teacher/UpdateInfoForm';

const cookies = new Cookies();

const { Footer, Sider } = Layout;
const grid33 = {
  width: '33.33%',
  boxShadow: 'none'
};
const grid100 = {
  width: '100%',
  boxShadow: 'none'
};

const UpdateTutor = ({ setshowLayout }) => {
  const [tutor, setTutor] = useState({});
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  const history = useHistory();

  const curr_user = cookies.get('CURR_USER');

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
    tutorApi
      .getTutor(curr_user.email)
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

  const handleShowFormUpdate = () => {
    setIsShowUpdate(true);
    // <UpdateInfoForm user={curr_user} />
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ background: '#001529' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
      <div>
        {isShowUpdate ? (
          <UpdateInfoForm user={tutor} setIsShowUpdate={setIsShowUpdate}/>
        ) : (
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
                    onClick={() => setIsShowUpdate(true)}
                  >
                    Update Your Info
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
                  <div className="value">
                    {formatCurrency(tutor.pricePerHour)}
                  </div>
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
        )}
      </div>
    </div>
  );
};

export default UpdateTutor;
