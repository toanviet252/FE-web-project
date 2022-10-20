import "./Login.scss";
import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  signInWithGoogleAcc,
  createUserDocumentFromAuth,
} from "../../utils/Firebase/firebase";

const Login = () => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("user", values);
    // navigate("/user");
  };
  const logInByGoogleAcc = async () => {
    const { user } = await signInWithGoogleAcc();
    await createUserDocumentFromAuth(user);
    console.log(user);
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
              <Input
                prefix={<MailOutlined />}
                placeholder="Your email "
              ></Input>
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
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Your password"
              />
            </Form.Item>

            <button type="submit" className="login-btn">
              Login
            </button>
          </Form>
          <div className="login-by-google-account">
            <button
              type="submit"
              className="log-google-acc-btn"
              onClick={() => logInByGoogleAcc()}
            >
              <i
                className="fa fa-lg fa-google-plus-square"
                aria-hidden="true"
              ></i>
              Login with Google Account
            </button>
          </div>
          <div className="forget-password">
            <p>
              <a href="#"> Forget password?</a>{" "}
            </p>
          </div>
          <div className="sign-up-container">
            <p>
              Don't have account? Register <Link to="/register">here</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
