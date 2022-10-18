import "./Login.scss";
import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("user", values);
    navigate("/user");
  };
  return (
    <>
      <div className="wrapper">
        <div className="header-login">
          <h1>App chat</h1>
          <p>Login to connect your friends.</p>
        </div>
        <div className="login-container">
          <Form
            layout="vertical"
            className="form-control"
            form={form}
            onFinish={onSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Input your email!",
                },
                {
                  type: "email",
                  message: "Email is invalid!",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Your email "></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Input your password!",
                },
                {
                  min: 9,
                  message: "Password is invalid",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Your password" />
            </Form.Item>

            <button type="submit" className="login-btn">
              Login
            </button>
          </Form>
          <div className="forget-password">
            <p>
              <a href="#"> Forget password?</a>{" "}
            </p>
          </div>
          <div className="sign-up- container">
            <p>
              Don't have account? Register <a href="#">here</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
