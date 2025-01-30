import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase"; // ✅ Sahi import yeh hai

const Login = () => {
  const onFinish = (values) => {
    const { email, password } = values; // ✅ Input values extract karo
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
      })
      .catch((error) => {
        console.error("Login error:", error.message);
      });
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", paddingTop: "50px" }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
