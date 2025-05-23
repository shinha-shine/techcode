import React, { useEffect, useState,useRef } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { useCallback } from 'react';

const BillPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null); // State to hold selected bill details

  const getAllBills = useCallback(async () => {
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({ type: 'HIDE_LOADING' });
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      console.error("Error fetching bills:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllBills();
  }, [getAllBills]);

  // Columns for the table
  const columns = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Customer Name', dataIndex: 'customerName' },
    { title: 'Contact Number', dataIndex: 'customerContact' },
    { title: 'Sub Total', dataIndex: 'subTotal' },
    { title: 'Tax', dataIndex: 'tax' },
    { title: 'Total Amount', dataIndex: 'totalAmount' },
    {
      title: 'Actions',
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record); // Set the selected bill
              setPopupModal(true); // Show the modal
            }}
          />
        </div>
      ),
    },
  ];

    
  return (
    
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Invoice List</h1>
      </div>

      <Table
        columns={columns}
        dataSource={billsData}
        rowKey="_id"
        bordered
      />

      {popupModal && selectedBill && (
        <Modal
  width={400}
  title={null}
  visible={popupModal}
  onCancel={() => {
    setPopupModal(false);
    setSelectedBill(null);
  }}
  footer={null}
>
  <div ref={componentRef} style={{ fontFamily: 'monospace', textAlign: 'center', fontSize: '12px' }}>
    <h4 style={{ margin: 0 }}>ITALIAN CUISINE - POS</h4>
    <p style={{ margin: 0 }}>Waidya Road, Dehiwala</p>
    <p style={{ margin: 0 }}>Colombo-06, Sri Lanka</p>
    <p style={{ margin: 0 }}>Tel: 032 226 9095</p>
    <hr style={{ borderStyle: 'dashed' }} />

    <p >Date: {new Date(selectedBill.createdAt).toLocaleString()}</p>
    <p >Bill ID: {selectedBill._id.slice(-6)}</p>
    <p >Customer: {selectedBill.customerName || "N/A"}</p>
    <p >Contact: {selectedBill.customerContact || "N/A"}</p>
    <p >Pay Mode: {selectedBill.paymentMode.toUpperCase()}</p>
    <hr style={{ borderStyle: 'dashed' }} />

    <table style={{ width: '100%', fontSize: '12px' }}>
      <thead>
        <tr>
          <th align="left">Item</th>
          <th>Qty</th>
          <th align="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {selectedBill.cartItems.map(item => (
          <tr key={item._id}>
            <td align="left">{item.name}</td>
            <td >{item.quantity}</td>
            <td align="right">${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <hr style={{ borderStyle: 'dashed' }} />
    <table style={{ width: '100%', fontSize: '12px' }}>
      <tbody>
        <tr>
          <td align="left">Subtotal:</td>
          <td align="right">${selectedBill.subTotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td align="left">Tax (10%):</td>
          <td align="right">${selectedBill.tax.toFixed(2)}</td>
        </tr>
        <tr>
          <td align="left"><strong>Total:</strong></td>
          <td align="right"><strong>${selectedBill.totalAmount.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>
    <hr style={{ borderStyle: 'dashed' }} />
    <p style={{ margin: 0 }}>Thank You!</p>
    <p style={{ margin: 0 }}>Please Visit Again</p>
  </div>
</Modal>
      )}
    </DefaultLayout>
  );}


export default BillPage;
