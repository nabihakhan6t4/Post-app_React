// AppHeader.js
import React from "react";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const AppHeader = ({ children }) => {
  const navigate = useNavigate();

  const items = [
    { key: "/", label: "Home" },
    { key: "/Login", label: "Login" },
    { key: "/SignUp", label: "Signup" },
    { key: "/Profile", label: "Profile" },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          onClick={(data) => navigate(data.key)}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ flexGrow: 1, padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "100%",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  );
};

export default AppHeader;