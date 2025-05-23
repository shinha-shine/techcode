// pages/HelpCenter.js
import React from 'react';
import { Input, Collapse, Button } from 'antd';
import DefaultLayout from '../components/DefaultLayout';

const { Panel } = Collapse;

const HelpCenter = () => {
  return (
    <DefaultLayout>
      <div className="help-container">
        <h2 className="help-title">Help Center</h2>
        <p className="help-subtitle">Find answers to common questions below</p>

        <Input.Search
          className="help-search"
          placeholder="Search for help..."
          enterButton
        />

        <div className="faq-section">
          <h3 className="faq-header">FAQs</h3>
          <Collapse accordion>
            <Panel header="How do I reset my password?" key="1">
              <p>Go to Settings &gt; Change Password. Enter your new password and save.</p>
            </Panel>
            <Panel header="How can I contact support?" key="2">
              <p>You can email us at support@italianfood.com or use the contact section below.</p>
            </Panel>
            <Panel header="How to view my previous bills?" key="3">
              <p>Navigate to the Bills section in the sidebar to see your bill history.</p>
            </Panel>
          </Collapse>
        </div>

        <div className="contact-support">
          <h3>Still need help?</h3>
          <p>Contact our support team below:</p>
          <Button type="primary" href="mailto:support@italianfood.com">
            Email Support
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HelpCenter;
