import { useState } from 'react';
import { REGEX_EMAIL, REGEX_PHONE } from '../constant';
import * as _ from 'lodash';

const checkValid = (id, value) => {
  const patternEmail = new RegExp(REGEX_EMAIL);
  const patternPhone = new RegExp(REGEX_PHONE);
  let classes = document.getElementById(id).classList;

  switch (id) {
    case 'email': {
      classes = patternEmail.test(value)
        ? classes.remove('invalid')
        : classes.add('invalid');
      break;
    }
    case 'phone': {
      classes = patternPhone.test(value)
        ? classes.remove('invalid')
        : classes.add('invalid');
      break;
    }
    case 'address':
    case 'fullName':
    case 'password':
    case 'repeatPassword': {
      classes = !_.isEmpty(value)
        ? classes.remove('invalid')
        : classes.add('invalid');
      break;
    }
  }
};

export const useInput = id => {
  const [value, setValue] = useState('');

  return {
    id,
    value,
    setValue,
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
        checkValid(id, event.target.value);
      }
    }
  };
};
