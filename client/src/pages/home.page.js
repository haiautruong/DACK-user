import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Button, Row, Select, Tag } from 'antd';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import { logout } from '../reducers/auth.reducer';
const { Option } = Select;

// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from '../components';

const skills = ['C++', 'C#', 'Java', 'Math', 'Physic', 'Chemistry', 'React', 'Node', 'Angular'];

const HomePage = ({ setshowLayout, user, logout }) => {
  let history = useHistory();
  const location = useLocation();
  useEffect(() => {
    async function checkLocation() {
      if(location.pathname === '/login'||location.pathname === '/signup'){
        await setshowLayout(false);
      }
      else{
        await setshowLayout(true);
      }
    }
    checkLocation();
  });
  const linkToSignIn = e => {
    if (user) {
      logout();
    }

    history.push('/login');
  };

  const handleChange = () => {

  }

  return (
    <div className="home-page">
      <Row className='content-header'>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Search"
          defaultValue={['C++', 'C#']}
          renderSelectValue ={selected => selected.map(item => {console.log(item)})}
          onChange={handleChange}
          size='large'
          // optionLabelProp="label"
        >
          {
            skills.map(skill => 
              <Option key={skill}>
                {
                  skill
                }
              </Option>
            )
          }
        </Select>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
