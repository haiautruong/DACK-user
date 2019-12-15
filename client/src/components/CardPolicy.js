import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { renderStar, formatCurrency, renderTags } from '../utils/helper';
import { useHistory } from 'react-router-dom';
import '../style/component/cardTutor.scss';

const { Meta } = Card;

const CardPolicy = ({ id, code, status, tutorName, studentName, subject }) => {
  const history = useHistory();

  const handleOnCard = () => {
    history.push(`/policy/${id}`);
  };

  return (
    <Card
      className="card-policy"
      style={{ cursor: 'pointer' }}
      title={`${code} - ${status}`}
      bordered={false}
      onClick={handleOnCard}
    >
      <p>{`Tutor: ${tutorName}`}</p>
      <p>{`Student: ${studentName}`}</p>
      <p>{`Subject: ${subject}`}</p>
    </Card>
  );
};

export default CardPolicy;
