/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const ModalChangePass = props => {
  const { getFieldDecorator } = props.form;
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(!!value);
  };

  const updatePass = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        setConfirmDirty(false);
        props.form.resetFields();
      }
    });

    props.setShowModalChangePass(false);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  return (
    <div>
      <Modal
        title="Change your password"
        visible={props.isOpen}
        onOk={updatePass}
        onCancel={() => props.setShowModalChangePass(false)}
      >
        <Form>
          <Form.Item label="Current password">
            {getFieldDecorator('currentPass', {
              rules: [
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
