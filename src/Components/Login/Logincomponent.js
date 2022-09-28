import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import "./login.scss";
import { signIn } from "../../utils/firebase/firebase";

const LoginForm = (props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const onCreate = (values) => {
    console.log(values);
    setIsOpen(false);
  };
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((infor) => {
        console.log("Validate failed:", infor);
      });
  };
  ////////////////////////////////////
  // Google login users:
  const logGoogleUser = async () => {
    const respone = await signIn();
    console.log(respone);
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
        <button
          className="google-login-btn"
          type="submit"
          onClick={logGoogleUser}
        >
          Đăng nhập với google
        </button>
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
