import React from 'react';
import { COLORS } from '../constant';
import { Tag } from 'antd';

export const renderStar = number => {
  const listStar = [];
  for (let i = 0; i < Math.round(number); i += 1) {
    listStar.push(<span key={i} className="fa fa-star checked" />);
  }
  for (let i = Math.round(number); i < 5; i += 1) {
    listStar.push(<span key={i} className="fa fa-star" />);
  }

  return listStar;
};

export const formatCurrency = number => {
  const formater = new Intl.NumberFormat('vi-VND', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });
  return formater.format(number);
};

export const renderTags = (listSkills = [], color = true) => {
  return listSkills.map((skill, key) => {
    return (
      <Tag className="tag" key={key} color={color ? COLORS[key] : null}>
        {skill}
      </Tag>
    );
  });
};
