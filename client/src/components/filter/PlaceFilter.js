/* eslint-disable react/prop-types */
import React from 'react';
import {Select} from 'antd';

const {Option} = Select;

const provinces = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12',
  'Thủ Đức', 'Gò Vấp', 'Bình Thạnh', 'Tân Bình', 'Tân Phú', 'Phú Nhuận',
  'Bình Tân', 'Củ Chi', 'Hóc Môn', 'Bình Chánh', 'Nhà Bè', 'Cần Giờ'
];

const PlaceFilter = ({handleChange}) => {
  return (<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <h1 style={{margin: 'auto 20px'}}>Places</h1>
    <Select
      mode="multiple"
      style={{width: '100%', border: 'solid 1px #c5c5c5', borderRadius: '5px'}}
      className="filter"
      placeholder="Filter By Places"
      onChange={handleChange}
      size="large">
      {provinces.map(province => (
        <Option key={province}>{province}</Option>
      ))}
    </Select>
  </div>);
};

export default PlaceFilter;
