import React, { useState } from 'react';
import { Form, Input, Select, Button, InputNumber, DatePicker } from 'antd';
import PropTypes from 'prop-types';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const FormContract = props => {
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [endOpen, setEndOpen] = useState(false);

  const { getFieldDecorator } = props.form;
  const tutor = props.tutor;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const handleChangeSubject = e => {
    console.log('e', e);
  };

  const disabledStartDate = startValue => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onChange = (field, value) => {
    if (field === 'startValue') {
      setStartValue(value);
    } else {
      setEndValue(value);
    }
  };

  const onStartChange = value => {
    onChange('startValue', value);
  };

  const onEndChange = value => {
    onChange('endValue', value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="Tutor name">
        <Input value={tutor.fullName} disabled />
      </Form.Item>
      <Form.Item label="Subject">
        {getFieldDecorator('subject', {
          rules: [
            {
              required: true,
              message: 'Please select a subject!'
            }
          ]
        })(
          <Select placeholder="Select a subject" onChange={handleChangeSubject}>
            {tutor.skills.map(skill => (
              <Option key={skill}>{skill}</Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="Total hour">
        {getFieldDecorator('totalHour', {
          rules: [
            {
              required: true,
              message: 'Must be a number and not empty!'
            }
          ]
        })(<InputNumber style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item label="Date start">
        {getFieldDecorator('startDate', {
          rules: [
            {
              required: true,
              message: 'Please select a subject!'
            }
          ]
        })(
          <DatePicker
            disabledDate={disabledStartDate}
            format="DD-MM-YYYY"
            setFieldsValue={startValue}
            placeholder="Start"
            onChange={onStartChange}
            onOpenChange={handleStartOpenChange}
            style={{ width: '100%' }}
          />
        )}
      </Form.Item>
      <Form.Item label="Date End">
        {getFieldDecorator('endDate', {
          rules: [
            {
              required: true,
              message: 'Please select a date!'
            }
          ]
        })(
          <DatePicker
            style={{ width: '100%' }}
            disabledDate={disabledEndDate}
            format="DD-MM-YYYY"
            setFieldsValue={endValue}
            placeholder="End"
            onChange={onEndChange}
            open={endOpen}
            onOpenChange={handleEndOpenChange}
          />
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button className="btn-register" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

FormContract.propTypes = {
  form: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired
};

export default Form.create({ name: 'formContract' })(FormContract);
