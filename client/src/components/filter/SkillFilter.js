import React from 'react';
import {Select} from 'antd';

const {Option} = Select;

const SkillFilter = ({skills, handleChange}) => {
  return (<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <h1 style={{margin: 'auto 20px'}}>Skill</h1>
    <Select
      mode="multiple"
      style={{width: '100%', border: 'solid 1px #c5c5c5', borderRadius: '5px'}}
      className="filter"
      placeholder="Filter By Skill"
      onChange={handleChange}
      size="large">
      {skills.map(skill => (
        <Option key={skill.skillName}>{skill.skillName}</Option>
      ))}
    </Select>
  </div>);
};

export default SkillFilter;
