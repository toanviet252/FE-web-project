import React from "react";
import { Menu, Col, Row, Space } from "antd";
import "./Header.component.scss";
import LoginForm from "../Login/Logincomponent";
import SignUp from "../SignUp/SignUpComponent";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  const items = [
    {
      label: <NavLink to="/seller">Kênh người bán </NavLink>,
      key: "seller",
    },
    {
      label: <NavLink to="/buyer">Kênh người mua </NavLink>,
      key: "buyer",
    },
    {
      label: <NavLink to="/test">Thông báo </NavLink>,
      key: "notification",
    },
    {
      label: <NavLink to="/g">Hỗ trợ</NavLink>,
      key: "help",
    },
    {
      label: <NavLink to="/h">Chọn ngôn ngữ </NavLink>,
      key: "language",
      children: [
        {
          label: "Tiếng Việt",
          key: "vietnamese",
        },
        {
          label: "English",
          key: "english",
        },
      ],
    },
  ];
  return (
    <>
      <Row className="nav-menu">
        <Col xs={24} sm={24} lg={15}>
          <Menu mode="horizontal" items={items} className="nav-items" />
        </Col>
        <Col xs={24} sm={12} lg={4} id="form-btn">
          <Space>
            <SignUp btnSignUp="Đăng ký" />
            <LoginForm btnLabel="Đăng nhập" />
          </Space>
        </Col>
      </Row>
    </>
  );
};
export default HeaderComponent;
