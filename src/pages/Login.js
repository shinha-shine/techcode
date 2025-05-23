import { Form, Input, Button } from 'antd';
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleSubmit =async (value) => {
    try {
        dispatch({ type: 'SHOW_LOADING' });
    
        
        const res = await axios.post("/api/users/login",value);
        message.success(res.data.message);
          message.success("User Login Successfully!");
          localStorage.setItem('auth',JSON.stringify(res.data));
          navigate('/');
      
        dispatch({ type: 'HIDE_LOADING' });
        
      } catch (error) {
  
        dispatch({ type: 'HIDE_LOADING' });
        message.error('Incorrect userID or password');
        console.log(error);
      }
  };

  //currently login user
  useEffect(() => {
    if( localStorage.getItem('auth')){
        localStorage.getItem('auth');
    navigate('/');
    }
    
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-image-side">
        <img src="/Bg1.jpg" alt="Login Visual" />
      </div>
      <div className="auth-form-side">
        
        <div className="form-container">
        
          <h2>Welcome Back</h2>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
              <Input placeholder="Enter your User ID" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <div className="form-footer">
              <p>Don’t have an account? <Link to="/register">Register</Link></p>
              <Button type="primary" htmlType="submit" block>Login</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
