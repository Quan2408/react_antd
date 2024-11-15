import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const items = [
  {
    key: "1",
    label: <Link to="/">Home</Link>,
  },
  {
    key: "2",
    label: <Link to="/signup">Sign up</Link>,
  },
  {
    key: "3",
    label: <Link to="/signin">Sign in</Link>,
  },
  {
    key: "4",
    label: <Link to="/admin/products">Admin</Link>,
  },
];
const LayoutWebsite = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>LayoutWebsite</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default LayoutWebsite;
