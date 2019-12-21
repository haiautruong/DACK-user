/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Pagination, Icon, Layout, Menu, Row, Col, Modal, Radio, Typography, Rate, Button } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import CardPolicy from '../components/CardPolicy';
import { ITEM_PER_PAGE_POLICY } from '../constant';
import { tutorApi, homeApi } from '../api';
import { studentApi } from '../api';
import { Cookies } from 'react-cookie';
import { sliceArray, formatCurrency } from '../utils/helper';

const { Paragraph } = Typography;
const cookies = new Cookies();
const { Sider } = Layout;

const ListPolicies = ({ setshowLayout }) => {
  const history = useHistory();
  const [policies, setPolices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(policies.length);
  const [showModal, setShowModal] = useState(false);
  const [policyDetail, setPolicyDetail] = useState(null);
  const [status, setStatus] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [changed, setChanged] = useState(false);
  const user = cookies.get('CURR_USER');
  const target = user.type === 1 ? tutorApi : studentApi;

  const loadData = () => {
    target
      .getListContracts(user.email)
      .then(result => {
        console.log('result', result);
        if (result.returnCode === 1) {
          setPolices(result.data);
          setTotal(result.data.length);
        } else {
          alert(result.returnMessage);
        }
      })
      .catch(error => {
        console.log('error get list tutor', error);
      });
  };

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
    loadData();
    
  }, []);

  const onChangePagination = page => {
    setCurrentPage(page);
  };

  const navigation = key => {
    if (key === '1') {
      if (user.type === 1) {
        history.push('/teacher-profile');
      } else {
        history.push('/student-profile');
      }
    } else if (key === '2') {
      history.push('/policy');
    } else if (key === '3'){
      history.push('/conversation');
    }
  };
  const renderListPolicy = (list = [], page) => {
    const start = (page - 1) * ITEM_PER_PAGE_POLICY;
    const end = start + ITEM_PER_PAGE_POLICY;
    const subList = sliceArray(list, start, end);
    return subList.map((policy, key) => {
      return (
        <Col className="col" key={key} xs={12} md={8} xl={8}>
          <CardPolicy
            id={policy.contractID}
            status={policy.status}
            teacherEmail={policy.teacherEmail}
            studentEmail={policy.studentEmail}
            subject={policy.subject}
            onClick={async () => {
              setPolicyDetail(policy);
              setReview(policy.review);
              setRating(policy.rating);
              setStatus(policy.status);
              setShowModal(true);
            }}
          />
        </Col>
      );
    });
  };

  const onChangeReview = (str) => {
    setChanged(true);
    setReview(str);
  };

  // const renderListPolicy = (list = [], page) => {
  //   console.log('policies', policies);
  //   return policies.map((policy, index) => {
  //     return (
  //       <Col key={index} span={8}>
  //         <CardPolicy
  //           id={policy.contractID}
  //           status={policy.status}
  //           teacherEmail={policy.teacherEmail}
  //           studentEmail={policy.studentEmail}
  //           subject={policy.subject}
  //         />
  //       </Col>
  //     );
  //   });
  // };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ background: '#001529' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['2']}
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
      <div className="container-info">
        {policies.length > 0 ? (
          <div>
            <Row className="container-policy" gutter={16}>
              {renderListPolicy(policies, currentPage)}
            </Row>
            <Pagination
              current={currentPage}
              onChange={onChangePagination}
              total={total}
              setTotal={setTotal}
              defaultPageSize={ITEM_PER_PAGE_POLICY}
            />
          </div>
        ) : (
          'No policy found'
        )}
      </div>
      <Modal 
        title="Contract Info"
        visible={showModal}
        onOk={async () => {
          await setShowModal(false);
        }}
        onCancel={async () => {
          await setShowModal(false);
        }}
        footer={[
          <Button key="back" onClick={() => {
            setShowModal(false);
            setChanged(false);
          }}>
            Close
          </Button>,
          <Button key="submit" type="primary" disabled={!changed} onClick={async () => {
            let resStatus = await homeApi.changeStatus(policyDetail.contractID, status);
            let resEdit = await homeApi.editContract(policyDetail.contractID, review, rating);
            if(resEdit.returnCode === 1 && resStatus.returnCode){
              console.log('reload data');
              loadData();
            }
            setShowModal(false);
            setChanged(false);
          }}>
            Save
          </Button>,
        ]}
        width='50%'
      >
        {
          policyDetail ?
            <div>
              <Row className='contract-row' style={{
                borderRadius: '5px',
                borderStyle: 'solid',
                paddingTop: '12px'
              }}>
                <Col span={8}>
                  <span className='contract-item-title'>Subject: </span>
                  <h1 style={{fontSize: 'large'}}>
                    {
                      policyDetail.subject
                    }
                  </h1>
                </Col>
                <Col span={8}>
                  <span className='contract-item-title'>ID: </span>
                  <h1 style={{fontSize: 'xx-large'}}>
                    {
                      policyDetail.contractID
                    }
                  </h1>
                </Col>
                <Col span={8}>
                  <span className='contract-item-title'>Creation Date: </span>
                  <h1 style={{fontSize: 'large'}}>
                    {
                      policyDetail.creationDate
                    }
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row'>
                <Col span={12}>
                  <span className='contract-item-title'>Teacher Email: </span>
                  <h1 style={{fontSize: 'x-large	'}}>
                    {
                      policyDetail.teacherEmail
                    }
                  </h1>
                  
                </Col>
                <Col span={12}>
                  <span className='contract-item-title'>Student Email: </span>
                  <h1 style={{fontSize: 'x-large'}}>
                    {
                      policyDetail.studentEmail
                    }
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row'>
                <Col span={12}>
                  <span className='contract-item-title'>Start Date: </span>
                  <h1 style={{fontSize: 'x-large'}}>
                    {
                      policyDetail.startDate
                    }
                  </h1>
                </Col>
                <Col span={12}>
                  <span className='contract-item-title'>End Date: </span>
                  <h1 style={{fontSize: 'x-large'}}>
                    {
                      policyDetail.endDate
                    }
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row price'>
                <Col span={4}>
                  <h2 className='contract-item-title'>Price: </h2>
                </Col>
                <Col span={4}>
                  <span className='contract-item-title'>Per hour</span>
                  <h1 style={{fontSize: 'large'}}>
                    {
                      formatCurrency(policyDetail.signedPrice)
                    }
                  </h1>
                </Col>
                <Col span={4}>
                X
                </Col>
                <Col span={4}>
                  <span className='contract-item-title'>Hour(s)</span>
                  <h1 style={{fontSize: 'large'}}>
                    {
                      policyDetail.totalHour
                    }
                  </h1>
                </Col>
                <Col span={2}>
                =
                </Col>
                <Col span={6}>
                  <h1 style={{fontSize: 'xx-large'}}>
                    {
                      formatCurrency(policyDetail.totalPrice)
                    }
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row'>
                <Col span={12}>
                  <span className='contract-item-title'>Review: </span>
                  <Paragraph 
                    editable={{ onChange: onChangeReview }}
                  >
                    {
                      review
                    }
                  </Paragraph>
                </Col>
                <Col span={12}>
                  <span className='contract-item-title'>Rating: </span>
                  <h1 style={{fontSize: 'large'}}>
                    <Rate allowHalf value={rating} onChange={(value) => {
                      setChanged(true);
                      setRating(value);
                    }}/>
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row' type="flex" justify="center">
                <Col span={12}>
                  <Radio.Group value={status} onChange={async (e) => {
                    setChanged(true);
                    setStatus(e.target.value);
                  }}>
                    <Radio.Button value={0}>CANCEL</Radio.Button>
                    <Radio.Button value={2}>WAITING</Radio.Button>
                    <Radio.Button value={3}>ON GOING</Radio.Button>
                    <Radio.Button value={1}>DONE</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
            :
            ''
        }
      </Modal>
    </div>
  );
};

export default withRouter(ListPolicies);
