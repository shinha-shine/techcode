import React, {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Layout, Menu} from 'antd';
import {Link, useNavigate} from "react-router-dom"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    SettingOutlined,
    AppstoreOutlined ,
    LogoutOutlined,
    QuestionCircleOutlined,
    PrinterOutlined,
    JavaOutlined,
    ShoppingCartOutlined,
  } from '@ant-design/icons';
  import "../styles/DefaultLayout.css";
import Spinner from './Spinner';

  const { Header, Sider, Content } = Layout;

 const DefaultLayout = ({ children }) => {
  // State and hooks
  const { cartItems, loading } = useSelector(state => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

    // Toggle sidebar
  const toggle = () => setCollapsed(!collapsed);
  // Save cart items to local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
        return (
            <Layout>
              {loading && <Spinner/>}
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                  <div className="logo-container">
                    <img src="/logo2.jpg" alt="Company Logo" className="sidebar-logo" />
                  </div>
                  <span className="company-name">Italian Cuisine</span>
                  <div className="company-name1">POS</div>
                  
                
                </div>
                <Menu mode="inline" defaultSelectedKeys={[window.location.pathname]}>
                  <Menu.Item key={"/"} icon={<AppstoreOutlined />}>
                    <Link to="/">Dashboard</Link>
                  </Menu.Item>

                  <Menu.Item key={"/dishes"} icon={<JavaOutlined />}>
                    <Link to="/items">Dishes</Link>
                  </Menu.Item>

                  <Menu.Item key={"/customer"} icon={<UserOutlined />}>
                    <Link to="/customer">Customer</Link>
                  </Menu.Item>

                  <Menu.Item key={"/bills"} icon={<PrinterOutlined />}>
                    <Link to="/bills">Bills</Link>
                  </Menu.Item>

                  <Menu.Item key={"/setting"} icon={<SettingOutlined />}>
                    <Link to="/setting">Setting</Link>
                  </Menu.Item>

                  <Menu.Item key={"/help"} icon={<QuestionCircleOutlined />}>
                    <Link to="/help">Help Center</Link>
                  </Menu.Item>

                  <Menu.Item key={"/logout"} 
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    localStorage.removeItem('auth')
                    navigate('/login')
                  }}>
                    Logout
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">

                <Header className="site-layout-background" style={{ padding: '0 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      
                      {/* Left: Toggle button */}
                      <div>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: toggle,
                        })}
                      </div>

                      {/* Right: Cart icon */}
                      <div
                        className='cart-item'
                        onClick={() => navigate('/cart')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          paddingLeft:'48em',
                        }}
                      >
                        <p style={{ margin: 0 }}>{cartItems.length}</p>
                        <ShoppingCartOutlined />
                      </div>
                    </div>
                  </Header>


                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Layout>
          );
  }

  export default DefaultLayout
 