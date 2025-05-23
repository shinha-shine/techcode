import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from "./pages/Homepage.js";
import ItemPage from "./pages/ItemPage.js";
import CartPage from './pages/CartPage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import BillPage from './pages/BillPage.js';
import CustomerPage from './pages/CustomerPage.js';
import SettingPage from './pages/SettingPage';
import HelpCenter from './pages/HelpCenter';


import 'antd/dist/reset.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>} />

          <Route path="/items" element={
            <ProtectedRoute>
              <ItemPage />
            </ProtectedRoute>} />

          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>} />

          <Route path="/bills" element={
            <ProtectedRoute>
              <BillPage />
            </ProtectedRoute>} />

          <Route path="/customer" element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>} />

            <Route path="/setting" element={
            <ProtectedRoute>
              <SettingPage />
            </ProtectedRoute>} />

          <Route path="/help" element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}
