import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword, auth } from "../config/firebase";
import { Link } from "react-router-dom";

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState(null); // State to store selected file

  const onFinish = async (values) => {
    const { fullName, email, password, confirmPassword, phone } = values;

    if (password !== confirmPassword) {
      messageApi.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      let photoURL = "";

      if (file) {
        // Uncomment and complete your file upload logic here
        // const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        // await uploadBytes(storageRef, file);
        // photoURL = await getDownloadURL(storageRef);
      }

      console.log("User signed up:", user);
      messageApi.success("Signup Successful!");
    } catch (error) {
      console.error("Signup error:", error.message);
      let errorMessage = "An error occurred during signup.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      }
      messageApi.error(errorMessage);
    }
  };
  const handleFileUpload = async ({ fileList }) => {
    console.log(fileList); // Ye line fileList ko log karegi
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj); // Sabse pehle file ko set karenge
    }
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "post_app");
    data.append("cloud_name", "dqkcaaucp");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqkcaaucp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) throw new Error("File upload failed");

      const uploadImageURL = await res.json();
      console.log(uploadImageURL.url);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      messageApi.error("Error uploading image.");
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
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number!" },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item name="profilePicture" label="Profile Picture">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileUpload}
            maxCount={1}
          >
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
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Register
          </Button>
        </Form.Item>

        <p style={{ textAlign: "center" }}>
          Already have an account? <Link to="./Login.jsx">Login here</Link>
        </p>
      </Form>
    </div>
  );
};

export default Signup;
