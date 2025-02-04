import React, { useEffect, useState } from "react";
import { Button, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { auth, db } from "../config/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteAccount = async () => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      navigate("/signup");
    } catch (error) {
      console.error("Account Deletion Error:", error);
    }
  };

  if (loading) return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  if (!user) return <Alert message="Please log in to access this page." type="info" showIcon />;

  return <Button type="danger" onClick={handleDeleteAccount}>Delete Account</Button>;
};

export { DeleteAccount };
