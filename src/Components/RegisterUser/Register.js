import "./register.scss";
import { DatePicker, Form, Input, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  createUserByEmailAndPass,
  createUserDocumentFromAuth,
} from "../../utils/Firebase/firebase";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

const RegisterUser = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  //Create authenticated user and post to Firestore
  const onCreate = async (values) => {
    console.log(values);
    const { email, password, dateBirth, phoneNumber, displayName } = values;
    const dateOfBirth = dateBirth.format("DD/MM/YYYY");
    try {
      setIsRegister(true);
      const { user } = await createUserByEmailAndPass(email, password);
      await createUserDocumentFromAuth(user, {
        dateOfBirth,
        phoneNumber,
        displayName,
      });
      await updateProfile(user, {
        displayName: displayName,
        photoURL: "123",
      });
      navigate("/");
      await message.success("Register account successed");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        message.warning(
          "Email has already in used. Please choose another email!"
        );
      } else {
        console.log("Error from create user", err);
      }
    }
  };
  const onSubmit = () => {
    form.validateFields().then((values) => {
      // console.log(value.dateBirth.format("DD/MM/YYYY"));
      onCreate(values);
      // form.resetFields();
    });
  };
  return (
    <div className="register-form-container">
      <h1>Register account</h1>
      <Form
        layout="vertical"
        className="form-control register-form"
        form={form}
        onFinish={onSubmit}
        size="medium"
      >
        <Form.Item
          label="Username"
          name="displayName"
          className="register-items"
          rules={[
            {
              required: true,
              message: "Username can not be empty! ",
            },
            {
              min: 6,
              message: "Must be more than 6 characters",
            },
            {
              max: 15,
              message: "Name is too long!",
            },
            {
              whitespace: true,
              message: "Invalid username",
            },
          ]}
          hasFeedback
        >
          <Input prefix={<UserOutlined />} placeholder="Your username" />
        </Form.Item>

        <Form.Item
          className="register-items"
          label="Date of birth"
          name="dateBirth"
          rules={[
            {
              required: true,
              message: "Date of birth can not be empty!",
            },
          ]}
        >
          <DatePicker placeholder="Your birthday" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          className="register-items"
          rules={[
            {
              required: true,
              message: "Phone number can not be empty",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<PhoneOutlined />}
            type="number"
            placeholder="Your phone number"
          />
        </Form.Item>
        <Form.Item
          className="register-items"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email can not be empty!",
            },
            {
              type: "email",
              message: "Email is invalid!",
            },
          ]}
          hasFeedback
        >
          <Input prefix={<MailOutlined />} placeholder="Your email "></Input>
        </Form.Item>
        <Form.Item
          className="register-items"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password can not be empty!",
            },

            {
              // Regext validate password!
              validator: (_, value) => {
                if (
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    value
                  )
                ) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error(
                      "Password must be include 8 characters, at least 1 uppercase, 1 lowercase, 1 number and 1 special character!"
                    )
                  );
                }
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Your password"
          />
        </Form.Item>
        <Form.Item
          className="register-items"
          label="Confirm Password"
          name="confirm-password"
          dependencies={["password"]}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The password does not match!")
                );
              },
            }),
            {
              required: true,
              message: "Confirm your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<UnlockOutlined />}
            placeholder="Confirm your password"
          />
        </Form.Item>

        <button type="submit" className="login-btn">
          {isRegister && (
            <Spin
              indicator={<LoadingOutlined />}
              style={{ marginRight: "5px" }}
            />
          )}
          SignUp
        </button>
      </Form>
    </div>
  );
};
export default RegisterUser;
