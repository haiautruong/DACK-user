import React from 'react';
import { Card } from 'antd';
// import { useHistory } from 'react-router-dom';
import '../style/component/cardTutor.scss';
import PropTypes from 'prop-types';
import { formatStatus } from '../utils/helper';

const CardPolicy = props => {
  // const history = useHistory();
  const { id, status, teacherEmail, studentEmail, subject } = props;

  const renderTitle = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          {id} - {formatStatus(status)}
        </div>
        <div>
          {
            status === 0 ?
            <div 
              style={{ 
                backgroundColor: '#ff4d4f', 
                color: '#fff', 
                paddingLeft: '15px', 
                paddingRight: '15px', 
                borderRadius: '5px' 
              }}>
              Send Complaint
            </div>
            :
            null
          }
        </div>
      </div>
    );
  };

  return (
    <Card
      className="card-policy"
      style={{ cursor: 'pointer' }}
      title={renderTitle()}
      bordered={false}
      onClick={props.onClick}
    >
      <p>{`Tutor: ${teacherEmail}`}</p>
      <p>{`Student: ${studentEmail}`}</p>
      <p>{`Subject: ${subject}`}</p>
    </Card>
  );
};

CardPolicy.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  teacherEmail: PropTypes.string.isRequired,
  studentEmail: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  onClick: PropTypes.any.isRequired
};

export default CardPolicy;
