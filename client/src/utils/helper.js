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
  const formater = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });
  return formater.format(number);
};

export const formatStatus = number => {
  let status = '';
  const color = COLORS[number];

  if (number === 0) {
    status = 'Cancel';
  } else if (number === 1) {
    status = 'Done';
  } else if (number === 2) {
    status = 'Waiting for approve';
  } else if (number === 3) {
    status = 'Teaching';
  }

  return (
    <Tag className="tag" color={color}>
      {status}
    </Tag>
  );
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

export const sliceArray = (array = [], start, end) => {
  return array.slice(start, end);
};
