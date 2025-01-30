import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // Listen to the authentication state change to get the user info
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <Card
              hoverable
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Avatar
                size={120}
                src={user.photoURL ? user.photoURL : <UserOutlined />}
                style={{ marginBottom: "20px", border: "2px solid #1890ff" }}
              />
              <h2 style={{ margin: "10px 0" }}>{user.displayName || "User Name"}</h2>
              <p style={{ color: "#777", marginBottom: "20px" }}>
                {user.email}
              </p>
              <Button
                type="primary"
                style={{
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#1890ff",
                }}
              >
                Edit Profile
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default Profile;
