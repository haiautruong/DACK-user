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
      <div>
        {id} - {formatStatus(status)}
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
  status: PropTypes.string.isRequired,
  teacherEmail: PropTypes.string.isRequired,
  studentEmail: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  onClick: PropTypes.any.isRequired
};

export default CardPolicy;
