import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd"; // Add message here
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {  // Make onFinish async
        const { email, password } = values;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
            messageApi.success("Login Successful!");
        } catch (error) {
            console.error("Login error:", error.message);

            // More user-friendly error handling (example)
            let errorMessage = "An error occurred during login.";
            if (error.code === "auth/user-not-found") {
                errorMessage = "User not found. Please sign up.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password.";
            } else if (error.code === "auth/invalid-email"){
                errorMessage = "Invalid email format."
            }
            // Add more specific error handling as needed

            messageApi.error(errorMessage);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        messageApi.error("Failed to submit the form. Please check the fields."); // Form validation error
    };

    return (
        <div style={{ maxWidth: "300px", margin: "0 auto", paddingTop: "50px" }}>
            {contextHolder} {/* Context provider for messages */}
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed} // Handle form validation errors
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
                        Signup
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;