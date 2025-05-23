import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector,useDispatch } from 'react-redux';
import {DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
        } from '@ant-design/icons';
import { Table,Button, Modal,  Form, Input, Select, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [billPopup, setBillPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.rootReducer);

    //hnadle increament
    const handleIncreament = (record) =>{
        dispatch({
            type: 'UPDATE_CART',
            payload:{...record, quantity: record.quantity + 1},
        });
    };

    const handleDecreament = (record) =>{
        if(record.quantity !==  1){
            dispatch({
                type: 'UPDATE_CART',
                payload:{...record, quantity: record.quantity - 1},
            });
        }
       
    };

const columns = [
    {title:'Name',dataIndex: 'name'},
    {title:'Image',dataIndex: 'image' , 
        render:(image,record) => 
            <img src={image} alt={record.name} height="60" width="60" />},
    
    {title: 'Price' , dataIndex:'price'},
    {title: 'Quantity', dataIndex:'_id', 
        render:(id,record) => <div>
            <PlusCircleOutlined className='mx-3' 
            style={{cursor:'pointer'}}
            onClick={() => handleIncreament(record)}/>
            <b>{record.quantity}</b>

            <MinusCircleOutlined className='mx-3' 
            style={{cursor:'pointer'}}
            onClick={() => handleDecreament(record)}/>
        </div>},
    {title:'Actions', 
        dataIndex:"_id" , 
        render:(id,record) => 
        <DeleteOutlined  style={{cursor:'pointer'}}
        onClick={() => dispatch({
            type:"DELETE_FROM_CART",
            payload:record,
        })}/>,
    }
];
useEffect (() => {
    let temp =0;
    cartItems.forEach(item => temp = temp + (item.price * item.quantity));
    setSubTotal(temp);
}, [cartItems]);

const handleSubmit = async (value) => {
    try {
        const newObject = {
            ...value,
            cartItems,
            subTotal,
            tax: Number(((subTotal / 100) * 10).toFixed(2)),
            totalAmount: Number((Number(subTotal) + Number((subTotal / 100) * 10)).toFixed(2)),
            userId: JSON.parse(localStorage.getItem('auth'))._id,
        };

        await axios.post('/api/bills/add-bills',newObject);
        message.success('Bill Generated!');
        navigate('/bills'); // Navigate to the bills page after generating the bill
    } catch (error) {
        message.error('Something Went Wrong!');
        console.log(error);
    }
};


  return (
    <DefaultLayout>
        <h1>Cart Page</h1>
        <Table columns={columns} dataSource={cartItems} bordered />

        <div className='d-flex flex-column align-items-end'>
            <hr />
            <h4> Sub Total :  $ <b>{subTotal}</b> /-</h4>
            <Button type='primary' onClick={() => setBillPopup(true)}>
                Create Invoice
            </Button>
        </div>

        <Modal 
        title="Create Invoice"
        visible= {billPopup}
         onCancel={() => setBillPopup(false)}
         footer={false}>
           
           <Form 
           layout='vertical' 
           
         onFinish={handleSubmit}>

          <Form.Item name = 'customerName' label='Customer Name'>
            <Input/>
          </Form.Item>

          <Form.Item name = 'customerContact' label='Contact Number'>
            <Input/>
          </Form.Item>

          

        <Form.Item name='paymentMode' label='Payment Method'>
        <Select placeholder="Select Category">
          <Select.Option value='cash'>Cash</Select.Option>
          <Select.Option value='card'>Card</Select.Option>
          
         </Select>
        </Form.Item>
         
         <div className='bill-it'>
            <h6> Sub Total : <b> {subTotal}</b></h6>
            <h6>Tax
                <b>{((subTotal/ 100) * 10).toFixed(2)}</b>
            </h6>
            <h5>Grand Total - {" "}
                <b>{(Number(subTotal) + Number((subTotal/ 100) * 10)).toFixed(2)}</b>
            </h5>
         </div>

         <div className='d-flex justify-content-end'>
          <Button type='primary' htmlType='submit' >
            Generate Bill
          </Button>
         </div>

        </Form>

        </Modal>
    </DefaultLayout>
  )
};

export default CartPage;