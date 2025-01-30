import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "/",
    label: <Link to="/">Home</Link>,  // Wrap the text with Link
  },
  {
    key: "/Login",
    label: <Link to="/Login">Login</Link>,
  },
  {
    key: "/SignUp",
    label: <Link to="/SignUp">Signup</Link>,
  },
  {
    key: "/Profile",
    label: <Link to="/Profile">Profile</Link>,
  },
];

const AppHeader = (props) => {
  return (
    <Layout>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" items={items} />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          {props.children}  {/* This will render the changing content */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AppHeader;
