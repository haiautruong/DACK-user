/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Pagination, Icon, Layout, Menu, Row, Col } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import CardPolicy from '../components/CardPolicy';
import { ITEM_PER_PAGE } from '../constant';
const { Sider } = Layout;

const ListPolicies = ({ setshowLayout }) => {
  const history = useHistory();
  const [policies, setPolices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(policies.length);

  useEffect(() => {
    async function fetchLayout() {
      await setshowLayout(true);
    }
    fetchLayout();
    setTotal(1);
    setPolices([]);
  }, []);

  const onChangePagination = page => {
    setCurrentPage(page);
  };

  const navigation = key => {
    if (key === '1') {
      history.push('/student-profile');
    } else if (key === '2') {
      history.push('/policy');
    }
  };

  const renderListPolicy = () => {
    return policies.map((policy, index) => {
      return (
        <Col key={index} span={6}>
          <CardPolicy id='' code='' status='' tutorName='' studentName='' subject />
        </Col>
      );
    });
  };

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
              {renderListPolicy()}
            </Row>
            <Pagination
              current={currentPage}
              onChange={onChangePagination}
              total={total}
              setTotal={setTotal}
              defaultPageSize={ITEM_PER_PAGE}
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
