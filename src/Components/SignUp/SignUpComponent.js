import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

const SignUp = ({ btnSignUp }) => {
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
        message.success("Đăng ký thành công!");
      })
      .catch((infor) => {
        console.log("Validate failed:", infor);
      });
  };

  return (
    <>
      <Modal
        title="Đăng ký"
        open={isOpen}
        okText="Đăng ký"
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={onSubmit}
        cancelButtonProps={{
          ghost: true,
        }}
      >
        <Form form={form} name="signup" layout="vertical">
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
              {
                min: 5,
                message: "Tối thiểu 5 kí tự!",
              },
              {
                whitespace: true,
                message: "Không được chứa dấu cách",
              },
            ]}
            hasFeedback
          >
            <Input type="text" placeholder="Nhập tên đăng nhập của bạn" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
              {
                min: 9,
                message: "Mật khẩu tối thiểu 9 kí tự",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Email"
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
            hasFeedback
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="telephone"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
            ]}
            hasFeedback
          >
            <Input type="number" placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        style={{
          padding: "0 1.5rem",
        }}
        id="btn"
        type="submit"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {btnSignUp ?? "Đăng ký"}
      </Button>
    </>
  );
};

export default SignUp;
