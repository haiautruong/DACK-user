/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { tutorApi } from '../api';
import { studentApi } from '../api';
import ModalComfirm from '../components/ModalComfirm';

const ModalChangePass = props => {
  const { getFieldDecorator } = props.form;
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [openComfirm, setOpenComfirm] = useState(false);
  const [message, setMessage] = useState('');

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(!!value);
  };

  const updatePass = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const target = props.type === 1 ? tutorApi : studentApi;

        target
          .changePass(props.email, values.currentPassword, values.newPassword)
          .then(async res => {
            if (res.returnCode === 1) {
              await setMessage(res.returnMessage);
              await setOpenComfirm(true);

              if (res.returnMessage === 'Success') {
                setConfirmDirty(false);
                props.form.resetFields();
                props.setShowModalChangePass(false);
              }
            } else {
              setMessage(`Fail: ${res.returnMessage}`);
              setOpenComfirm(true);
            }
          })
          .catch(err => {
            alert('Error: ', err);
          });
      }
    });
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
        <ModalComfirm
          open={openComfirm}
          message={message}
          setOpenComfirm={setOpenComfirm}
        />
        <Form>
          <Form.Item label="Current password">
            {getFieldDecorator('currentPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your current password!'
                }
              ]
            })(<Input.Password />)}
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
