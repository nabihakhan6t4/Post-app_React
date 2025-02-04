import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword, auth, db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore"; // For saving user data to Firestore

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { fullName, email, password, confirmPassword, phone } = values;

    if (password !== confirmPassword) {
      messageApi.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = "";
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "post_app");
        data.append("cloud_name", "dqkcaaucp");

        const res = await fetch("https://api.cloudinary.com/v1_1/dqkcaaucp/image/upload", {
          method: "POST",
          body: data,
        });

        if (!res.ok) throw new Error("File upload failed");

        const uploadImageURL = await res.json();
        photoURL = uploadImageURL.url;
      }

      const userData = {
        name: fullName,
        email,
        phone,
        avatar: photoURL,
      };

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      messageApi.success("Signup successful!");
      navigate("/profile"); // Redirect to Profile page after signup
    } catch (error) {
      console.error("Signup error:", error.message);
      messageApi.error("Error signing up!");
    }
    setLoading(false);
  };

  const handleFileUpload = ({ fileList }) => {
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "50px" }}>
      {contextHolder}
      <Form
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
      >
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>

        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter your phone number!" }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item name="profilePicture" label="Profile Picture">
          <Upload beforeUpload={() => false} onChange={handleFileUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter a password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
            Register
          </Button>
        </Form.Item>

        <p style={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </div>
  );
};

export default Signup;
