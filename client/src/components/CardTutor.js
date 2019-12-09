import React, { useEffect } from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { renderStar, formatCurrency, renderTags } from '../utils/helper';
import '../style/component/cardTutor.scss';

const { Meta } = Card;

const CardTutor = ({
  avatar,
  fullName,
  pricePerHour,
  skills,
  rating,
  canTeachingPlaces
}) => {
  const renderPriceAndStar = () => {
    return (
      <Row>
        <Col span={10}>{formatCurrency(pricePerHour)}</Col>
        <Col span={14}>{renderStar(rating)}</Col>
      </Row>
    );
  };

  return (
    <Card
      className="card-tutor"
      size="small"
      style={{ width: 300 }}
      bordered={false}
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
