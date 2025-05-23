import { Form, Input, Button } from 'antd';
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleSubmit =async (value) => {
    try {
        dispatch({ type: 'SHOW_LOADING' });
    
        
        await axios.post("/api/users/register" , value);
        
          message.success("User Register Successfully!");
          navigate('/login');
      
        dispatch({ type: 'HIDE_LOADING' });
        
      } catch (error) {
  
        dispatch({ type: 'HIDE_LOADING' });
        message.error('Something Went Wrong');
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
        <img src="/Bg1.jpg" alt="Register Visual" />
      </div>

      <div className="auth-form-side">
        
        <div className="form-container">
        
          <h2>Create Account</h2>
          <Form layout="vertical" onFinish={handleSubmit}>

            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
              <Input placeholder="Choose a unique ID" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password placeholder="Enter a secure password" />
            </Form.Item>

            <div className="form-footer">
              <p>Already have an account? <Link to="/login">Login</Link></p>
              <Button type="primary" htmlType="submit" block>Register</Button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
