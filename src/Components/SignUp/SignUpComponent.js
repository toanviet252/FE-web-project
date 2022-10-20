import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import "./SignUp.scss";
import {
  createUser,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const onCreate = async (values) => {
    //Giá trị mà người dùng nhập vào
    const { displayName, email, password, phoneNumber } = values;
    try {
      const { user } = await createUser(email, password);
      await createUserDocumentFromAuth(user, { displayName, phoneNumber });
      //Update lại để đồng bộ databse với authentication trên Firebase
      await updateProfile(user, {
        displayName: displayName,
        photoURL: null, //giá trị này sẽ lấy khi người dùng đăng ảnh (chưa thực hiện)
      });
      //Ngoài ra ta có thêm update thêm các thông tin khác như 'phoneNumber, password, email"... bằng các hàm do firebase cung cấp.
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email đã được sử dụng! Vui lòng chọn email khác");
      } else {
        console.log("Error create User", err);
      }
    }
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
            name="displayName"
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
            <Input.Password placeholder="Nhập mật khẩu" />
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
            name="phoneNumber"
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
          padding: "0px",
          border: "none",
          color: "#1890ff",
        }}
        type="submit"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Đăng ký ngay!
      </Button>
    </>
  );
};

export default SignUp;
