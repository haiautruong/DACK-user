import React, {useState} from 'react';
import {Modal, Input, Button, Form, Radio} from 'antd';
import {REGEX_EMAIL} from "../constant";
import authApi from '../api/auth.api';

const ModalResetPass = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    setError('');

    if (email === ''){
      setError('Email Can Not Be Empty');
      return;
    }

    const patternEmail = new RegExp(REGEX_EMAIL);
    if (!patternEmail.test(email)) {
      setError('Email Is Not Valid');
      return;
    }

    const result = await authApi.resetPass(email);
    if (result.returnCode === 1){
      setError('Email Reset Password Sent Succeed !');
      setTimeout(() => props.setVisible(false), 2000);
    } else {
      setError(result.returnMessage);
    }

  };
  const { form } = props;
  const { getFieldDecorator } = form;

  const errorStyle = {
    color: 'red',
    marginTop: '-10px',
    marginBottom: '-10px'
  };

  return (
    <>
      <Modal
        title="Reset Pass"
        visible={props.visible}
        onOk={submit}
        okText="Ok"
        onCancel={() => props.setVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Email">
            <Input value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Item>
          <p style={errorStyle}>{error}</p>
        </Form>
      </Modal>
    </>
  );
};

export default Form.create({ name: 'form_in_modal' })(ModalResetPass);
