import "./Login.scss";
import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  signInWithGoogleAcc,
  createUserDocumentFromAuth,
  signInWithEmailAndPass,
} from "../../utils/Firebase/firebase";
import { AuthAction } from "../../redux/configureStore";
import { useDispatch } from "react-redux";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setCurrentUser = (user) => {
    dispatch(AuthAction.setCurrentUser(user));
  };
  const setCurrentUserPhoto = (imgUser) => {
    dispatch(AuthAction.setCurrentUserPhoto(imgUser));
  };
  const logIn = () => {
    dispatch(AuthAction.logIn());
  };

  //Submit login
  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const { user } = await signInWithEmailAndPass(email, password);
      setCurrentUser(user.displayName);
      logIn();
      navigate("/user");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          message.warning("Wrong email, please check again!");
          break;
        case "auth/wrong-password":
          message.warning("Wrong password, please check again!");
          break;
        default:
          console.log("default err", err);
      }
    }

    // navigate("/user");
  };
  const logInByGoogleAcc = async () => {
    const { user } = await signInWithGoogleAcc();
    await createUserDocumentFromAuth(user);
    // console.log(user);
    setCurrentUser(user.displayName);
    setCurrentUserPhoto(user.photoURL);
    logIn();
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
