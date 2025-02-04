import React, { useEffect, useState } from "react";
import { Card, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { auth, db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation
import Loader from "../component/Loader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
          // Redirect to profile page after login
          navigate("/profile"); // Replace with your desired route
        } else {
          messageApi.error("User data not found in Firestore.");
        }
      } else {
        messageApi.error("User not logged in.");
        navigate("/login"); // Redirect to login page if not logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [messageApi, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        {contextHolder}
        No user data available
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      {contextHolder}
      <Card
        style={{
          width: 300,
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        cover={<img alt="profile" src={user.avatar || "default-avatar.jpg"} />}
      >
        <Card.Meta
          avatar={<Avatar src={user.avatar || "default-avatar.jpg"} icon={<UserOutlined />} />}
          title={user.name}
          description={user.email}
        />
      </Card>
    </div>
  );
};

export default Profile;
