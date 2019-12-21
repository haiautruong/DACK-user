import React, { useState } from 'react';
import { Form, Input, Select, Button, InputNumber, DatePicker,
  Modal, Row, Col 
} from 'antd';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helper';
import { Cookies } from 'react-cookie';
import { homeApi } from '../../api';
import { useHistory } from 'react-router-dom';
const { Option } = Select;
const cookies = new Cookies();
const user = cookies.get('CURR_USER');

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
  const [showModal, setShowModal] = useState(false);
  const [policyDetail, setPolicyDetail] = useState(null);

  const { getFieldDecorator } = props.form;
  const tutor = props.tutor;
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        setPolicyDetail(values);
        setShowModal(true);
        
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
    <div>
      <h3 style={{ textAlign: 'center' }}>Create your contract</h3>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Tutor name">
          <Input value={tutor.fullName} disabled />
        </Form.Item>
        <Form.Item label="Price/hour">
          <Input value={formatCurrency(tutor.pricePerHour)} disabled />
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
            <Select
              placeholder="Select a subject"
              onChange={handleChangeSubject}
            >
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
      <Modal 
        title="Confirm Contract Info"
        visible={showModal}
        onOk={async () => {
          await setShowModal(false);
        }}
        onCancel={async () => {
          await setShowModal(false);
        }}
        footer={[
          <Button key="back" onClick={() => {
            setShowModal(false);
          }}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={async () => {
            setShowModal(false);
            const data ={
              teacherEmail: tutor.email,
              studentEmail: user.email,
              subject: policyDetail.subject,
              startDate: `${policyDetail.startDate._d.getFullYear()}-${policyDetail.startDate._d.getMonth()+1}-${policyDetail.startDate._d.getDate()}`,
              endDate: `${policyDetail.endDate._d.getFullYear()}-${policyDetail.endDate._d.getMonth()+1}-${policyDetail.endDate._d.getDate()}`,
              signedPrice: tutor.pricePerHour,
              totalHour: policyDetail.totalHour,
              totalPrice: parseInt(tutor.pricePerHour)*parseInt(policyDetail.totalHour),
            }
            const res = await homeApi.createContract(data);
            console.log('res from create', res);
            if(res.returnCode === 1){
              history.push('/policy');
            }
          }}>
            Create
          </Button>,
        ]}
        width='50%'
      >
        {
          policyDetail ?
            <div>
              <Row className='contract-row'
              
              type='flex'
              justify='center'
              align='middle'
              >
                <Col span={8}
                style={{
                  borderRadius: '5px',
                  borderStyle: 'solid',
                  paddingTop: '12px',
                }}
                >
                  <span className='contract-item-title'>Subject: </span>
                  <h1 style={{fontSize: 'large'}}>
                    {
                      policyDetail.subject
                    }
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row'>
                <Col span={12}>
                  <span className='contract-item-title'>Teacher Email: </span>
                  <h1 style={{fontSize: 'x-large	'}}>
                    {
                      tutor.email
                    }
                  </h1>
                  
                </Col>
                <Col span={12}>
                  <span className='contract-item-title'>Student Email: </span>
                  <h1 style={{fontSize: 'x-large'}}>
                    {
                      user.email
                    }
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row'>
                <Col span={12}>
                  <span className='contract-item-title'>Start Date: </span>
                  <h1 style={{fontSize: 'x-large'}}>
                    {
                      `${policyDetail.startDate._d.getFullYear()}-${policyDetail.startDate._d.getMonth()+1}-${policyDetail.startDate._d.getDate()}`
                    }
                  </h1>
                </Col>
                <Col span={12}>
                  <span className='contract-item-title'>End Date: </span>
                  <h1 style={{fontSize: 'x-large'}}>
                    {
                      `${policyDetail.endDate._d.getFullYear()}-${policyDetail.endDate._d.getMonth()+1}-${policyDetail.endDate._d.getDate()}`
                    }
                  </h1>
                </Col>
              </Row>
              <Row className='contract-row price'>
                <Col span={4}>
                  <h2 className='contract-item-title'>Price: </h2>
                </Col>
                <Col span={4}>
                  <span className='contract-item-title'>Per hour</span>
                  <h1 style={{fontSize: 'large'}}>
                    {
                      formatCurrency(tutor.pricePerHour)
                    }
                  </h1>
                </Col>
                <Col span={4}>
                X
                </Col>
                <Col span={4}>
                  <span className='contract-item-title'>Hour(s)</span>
                  <h1 style={{fontSize: 'large'}}>
                    {
                      policyDetail.totalHour
                    }
                  </h1>
                </Col>
                <Col span={2}>
                =
                </Col>
                <Col span={6}>
                  <h1 style={{fontSize: 'xx-large'}}>
                    {
                      formatCurrency(parseInt(tutor.pricePerHour)*parseInt(policyDetail.totalHour))
                    }
                  </h1>
                </Col>
              </Row>
            </div>
            :
            ''
        }
      </Modal>
    </div>
  );
};

FormContract.propTypes = {
  form: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired
};

export default Form.create({ name: 'formContract' })(FormContract);
