/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Pagination, Icon, Layout, Menu, Row, Col } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import CardPolicy from '../components/CardPolicy';
import { ITEM_PER_PAGE_POLICY } from '../constant';
import { tutorApi } from '../api';
import { studentApi } from '../api';
import { Cookies } from 'react-cookie';
import { sliceArray } from '../utils/helper';

const cookies = new Cookies();
const { Sider } = Layout;

const ListPolicies = ({ setshowLayout }) => {
  const history = useHistory();
  const [policies, setPolices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(policies.length);
  const user = cookies.get('CURR_USER');
  const target = user.type === 1 ? tutorApi : studentApi;

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();

    target
      .getListContracts(user.email)
      .then(result => {
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
          />
        </Col>
      );
    });
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
    </div>
  );
};

export default withRouter(ListPolicies);
