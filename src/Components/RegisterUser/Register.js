import "./register.scss";
import { DatePicker, Form, Input, message } from "antd";
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

const RegisterUser = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  //Create authenticated user and post to Firestore
  const onCreate = async (values) => {
    const { email, password, dateBirth, phoneNumber, userName } = values;
    const dateOfBirth = dateBirth.format("DD/MM/YYYY");
    try {
      const { user } = await createUserByEmailAndPass(email, password);
      await createUserDocumentFromAuth(user, { dateOfBirth, phoneNumber });
      await updateProfile(user, {
        displayName: userName,
        photoURL: null,
      });
      await navigate("/");
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
      form.resetFields();
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
          name="userName"
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
          SignUp
        </button>
      </Form>
    </div>
  );
};
export default RegisterUser;
