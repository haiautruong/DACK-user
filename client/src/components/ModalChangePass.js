import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const ModalChangePass = props => {
  console.log(props.isOpen);
  const [visible, setVisible] = useState(props.isOpen);
  const { getFieldDecorator } = props.form;
  const compareToFirstPassword = () => {};
  const validateToNextPassword = () => {};

  const handleConfirmBlur = () => {};

  return (
    <div>
      <Modal
        title="Change your password"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={handleConfirmBlur} />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create({ name: 'register' })(ModalChangePass);
