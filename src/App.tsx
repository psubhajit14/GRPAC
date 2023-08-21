import React, { useState } from 'react';
import { Button, Card, ConfigProvider, Layout, Menu, theme, Typography } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineHome } from 'react-icons/ai'
import { BsTable } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import {
  BrowserRouter,
  Link,
} from "react-router-dom";
import { RouterComponent } from './routes';

export const App: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider>
      <BrowserRouter>
        <Layout>
          <Sider collapsible collapsed={collapsed} style={{ padding: 0 }}>
            <Typography.Title style={{ textAlign: 'center', fontSize: 24, color: 'white' }}>{collapsed ? null : "GRPAC"}</Typography.Title>
            <Menu
              theme='dark'
              defaultValue={1}
              items={[
                {
                  label: 'Home',
                  icon: <Link to="/"><AiOutlineHome /></Link>,
                  key: 1,
                },
                {
                  label: 'Dashboard',
                  icon: <Link to="/dashboard"> <BsTable /></Link>,
                  key: 2,
                },
                {
                  label: 'Payment Details',
                  icon: <MdPayment />,
                  key: 3
                }
              ]}>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '24px',
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content style={{ margin: 16, width: '100%', height: '80vh' }}>
              <Card style={{ marginRight: "36px" }}>
                <RouterComponent />
              </Card>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider >
  )
}

export default App;
