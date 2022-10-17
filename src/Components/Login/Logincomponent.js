import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import "./login.scss";
import {
  signIn,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import { useNavigate } from "react-router-dom";
import SignUp from "../SignUp/SignUpComponent";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const onCreate = (values) => {
    props.setUserName(values.username);
    props.setUserPhoto("");
    setIsOpen(false);
  };
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
        props.login();
        navigate("/buyer");
      })
      .catch((infor) => {
        console.log("Validate failed:", infor);
      });
  };

  ////////////////////////////////////
  // Google login users:
  const logGoogleUser = async () => {
    const { user } = await signIn();
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
            label="Tên đăng nhập:"
            name="username"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
            ]}
          >
            <Input type="text" placeholder="Nhập tên đăng nhập của bạn" />
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
