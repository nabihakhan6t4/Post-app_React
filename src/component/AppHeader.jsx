import React, { useEffect, useState } from "react";
import { Layout, Menu, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  ProfileOutlined,
  PlusOutlined,
  LogoutOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getAuth, signOut, deleteUser, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const { Header, Content, Footer } = Layout;

const AppHeader = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAction = async (action) => {
    if (action === "signout") {
      try {
        await signOut(auth);
        localStorage.removeItem("token");
        navigate("/login");
        messageApi.success("Successfully signed out!");
      } catch (error) {
        console.error("Signout Error:", error);
        messageApi.error("Error signing out!");
      }
    } else if (action === "delete") {
      try {
        if (user) {
          await deleteDoc(doc(db, "users", user.uid));
          await deleteUser(user);
          console.log("Account deleted successfully");
          navigate("/signup");
          messageApi.success("Account deleted successfully!");
        }
      } catch (error) {
        console.error("Account Deletion Error:", error);
        messageApi.error("Error deleting account!");
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/post");
    }
  }, [user, navigate]);

  const menuItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, path: "/" },
    !user && { key: "login", label: "Login", icon: <LoginOutlined />, path: "/login" },
    !user && { key: "signup", label: "Signup", icon: <UserAddOutlined />, path: "/signup" },
    user && { key: "profile", label: "Profile", icon: <ProfileOutlined />, path: "/profile" },
    user && { key: "post", label: "Post", icon: <PlusOutlined />, path: "/post" },
    user && { key: "signout", label: "Signout", icon: <LogoutOutlined />, action: "signout" },
    user && { key: "delete", label: "Delete Account", icon: <DeleteOutlined />, action: "delete" },
  ].filter(Boolean);

  const selectedKey = menuItems.find((item) => item.path === location.pathname)?.key || "";

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {contextHolder}
      <Header style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{ flex: 1, display: "flex", justifyContent: "center" }}
        >
          {menuItems.map(({ key, label, icon, path, action }) => (
            <Menu.Item key={key} icon={icon} onClick={() => (path ? navigate(path) : handleAction(action))}>
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ flexGrow: 1, padding: "24px 48px" }}>
        <div style={{ background: "#fff", minHeight: "100%", padding: 24, borderRadius: 8 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AppHeader;
