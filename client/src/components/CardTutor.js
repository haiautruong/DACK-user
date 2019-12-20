/* eslint-disable react/prop-types */
import React from 'react';
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
        avatar={
          <Avatar
            src={
              avatar && avatar !== 'undefined'
                ? avatar
                : 'https://www.speakingtigerbooks.com/wp-content/uploads/2017/05/default-avatar.png'
            }
          />
        }
        title={fullName}
        description={renderPriceAndStar()}
      />
      <p className="text-small title">Skills</p>
      <Meta
        description={
          skills && skills.length !== 0 ? renderTags(skills) : 'Udating'
        }
      />
      <p className="text-small title">Teaching places</p>
      <Meta
        description={
          canTeachingPlaces && canTeachingPlaces.length !== 0
            ? renderTags(canTeachingPlaces, false)
            : 'Updating'
        }
      />
    </Card>
  );
};

export default CardTutor;
