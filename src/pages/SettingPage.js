// pages/Setting.js
import React from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import DefaultLayout from '../components/DefaultLayout';

const Setting = () => {
  const onFinish = (values) => {
    console.log('Updated Settings:', values);
    message.success('Settings updated successfully!');
  };

  return (
    <DefaultLayout>
      <div className="help-container">
        <h2 className="help-title">Settings</h2>
        <p className="help-subtitle">Manage your preferences and profile information</p>

        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: '0 auto' }}
        >
          <Form.Item label="Display Name" name="displayName">
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item label="Email Address" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Change Password" name="password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default Setting;
