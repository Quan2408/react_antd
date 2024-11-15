import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const items1 = [
  {
    key: "1",
    label: <Link to="/admin/products">Home</Link>,
  },
  {
    key: "2",
    label: <Link to="/admin/products/add">Add</Link>,
  },
  {
    key: "3",
    label: <Link to="/admin/dashboard">Dashboard</Link>,
  },
  {
    key: "4",
    label: <Link to="/">Back to home</Link>,
  },
];
const items2 = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "Product Manager",
    children: [
      {
        key: "1",
        label: <Link to="/admin/products">Product list</Link>,
      },
      {
        key: "2",
        label: <Link to="/admin/products/add">Add new product</Link>,
      },
    ],
  },
];
const LayoutAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout className="h-screen">
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: "List",
              },
              {
                title: "App",
              },
            ]}
            style={{
              margin: "16px 0",
            }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
