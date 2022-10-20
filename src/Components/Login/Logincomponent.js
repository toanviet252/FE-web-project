import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import "./login.scss";
import {
  signInWithGoogleAcc,
  createUserDocumentFromAuth,
  signInUser,
} from "../../utils/firebase/firebase";
import { useNavigate } from "react-router-dom";
import SignUp from "../SignUp/SignUpComponent";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const onCreate = async (values) => {
    const { email, password } = values;
    try {
      const { user } = await signInUser(email, password);
      console.log(user);
      //Sau đó lấy data ra để set tên cho người dùng:
      await props.setUserName(user.displayName);
      await props.login();
      await navigate("/buyer");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          message.warning("Nhập sai email");
          break;
        case "auth/wrong-password":
          message.warning("Nhập sai password");
          break;
        default:
          console.log(err);
      }
    }
  };
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
      })
      .catch((infor) => {
        console.log("Validate failed:", infor);
      });
  };

  ////////////////////////////////////
  // Google login users:
  const logGoogleUser = async () => {
    const { user } = await signInWithGoogleAcc();
    await createUserDocumentFromAuth(user);
    console.log(user);
    // tiến hành đăng nhập và chuyển đến trang buyer
    props.setUserName(user.displayName);
    props.setUserPhoto(user.photoURL);
    props.login();
    setIsOpen(false);
    navigate("/buyer");
  };

  return (
    <>
      <Modal
        title="Đăng nhập"
        open={isOpen}
        okText="Đăng nhập"
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={onSubmit}
        cancelButtonProps={{
          ghost: true,
        }}
      >
        <Form form={form} name="login" layout="vertical">
          <Form.Item
            label="Email:"
            name="email"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input type="text" placeholder="Nhập email của bạn" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu:"
            name="password"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
        </Form>
        <div>
          <h3>Hoặc</h3>
        </div>
        <div className="option-login-container">
          <button
            className="google-login-btn"
            type="submit"
            onClick={logGoogleUser}
          >
            Đăng nhập với google
          </button>
        </div>
        <div className="sign-up-container">
          <p>
            Bạn chưa có tài khoản? <SignUp />
          </p>
        </div>
      </Modal>
      <Button
        id="btn"
        type="submit"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {props.btnLabel ?? "Đăng nhập"}
      </Button>
    </>
  );
};

export default LoginForm;
