import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const ModalChangePass = props => {
  const { getFieldDecorator } = props.form;
  const compareToFirstPassword = () => {};
  const validateToNextPassword = () => {};
  const handleConfirmBlur = () => {};

  return (
    <div>
      <Modal
        title="Change your password"
        visible={props.isOpen}
        onOk={() => props.setShowModalChangePass(false)}
        onCancel={() => props.setShowModalChangePass(false)}
      >
        <Form>
          <Form.Item label="Current password">
            {getFieldDecorator('currentPass', {
              rules: [
                {
                  type: 'text',
                  message: 'The input is not valid your current password!'
                },
                {
                  required: true,
                  message: 'Please input your current password!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="New password" hasFeedback>
            {getFieldDecorator('newPassword', {
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
          <Form.Item label="Confirm password" hasFeedback>
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
