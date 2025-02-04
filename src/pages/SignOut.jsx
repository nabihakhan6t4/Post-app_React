import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Spin, Button, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SignOut = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Signout Error:", error);
    }
  };

  if (loading) return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  if (!user)
    return <Alert message="Please log in to access this page." type="info" showIcon />;

  return <Button type="primary" onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOut;