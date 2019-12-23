/* eslint-disable react/prop-types */
import React from 'react';
import {Icon, Slider} from 'antd';

function formatter(value) {
  if (value === 0)
  {return '0';}

  return `${value * 2}000 VNĐ`;
}

const PriceFilter = ({handleChange}) => {
  return (<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <h1 style={{margin: 'auto 20px'}}>Prices</h1>
    <Slider range
      tipFormatter={formatter}
      style={{width:'60%'}}
      defaultValue={[0, 200]}
      onChange={handleChange}
    />
    <Icon type="dollar" theme="twoTone"
      style={{fontSize:'20px', margin:'5px'}}
    />
  </div>
  );
};

export default PriceFilter;
