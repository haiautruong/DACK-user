import React, { useEffect } from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { renderStar, formatCurrency, renderTags } from '../utils/helper';
import { useHistory } from 'react-router-dom';
import '../style/component/cardTutor.scss';

const { Meta } = Card;

const CardTutor = ({
  avatar,
  fullName,
  pricePerHour,
  skills,
  rating,
  canTeachingPlaces,
  email
}) => {
  const history = useHistory();
  const renderPriceAndStar = () => {
    return (
      <Row>
        <Col span={10}>{formatCurrency(pricePerHour)}</Col>
        <Col span={14}>{renderStar(rating)}</Col>
      </Row>
    );
  };

  const handleOnCard = () => {
    history.push(`/detail-tutor/${email}`);
  };

  return (
    <Card
      className="card-tutor"
      size="small"
      bordered={false}
      onClick={handleOnCard}
    >
      <Meta
        avatar={<Avatar src={avatar} />}
        title={fullName}
        description={renderPriceAndStar()}
      />
      <p className="text-small title">Skills</p>
      <Meta description={renderTags(skills)} />
      <p className="text-small title">Teaching places</p>
      <Meta description={renderTags(canTeachingPlaces, false)} />
    </Card>
  );
};

export default CardTutor;
