import React, { useEffect, useState } from "react";
import { Menu, Col, Row } from "antd";
import "./Header.component.scss";
import LoginForm from "../Login/Logincomponent";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../redux/configureStore";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuthentication);
  const login = () => {
    dispatch(authAction.login());
  };
  const logout = () => {
    dispatch(authAction.logout());
  };
  const [username, setUserName] = useState("");
  //Chuyển đang trang home khi đăng xuất
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) return navigate("/");
    // eslint-disable-next-line
  }, [isAuth]);
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
      label: <NavLink to="/buyer/cart">Giỏ hàng </NavLink>,
      key: "cart",
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
          {isAuth && (
            <Menu mode="horizontal" items={items} className="nav-items" />
          )}
        </Col>

        <Col xs={24} sm={12} lg={4} id="form-btn">
          {!isAuth && (
            <LoginForm
              btnLabel="Đăng nhập"
              login={login}
              userName={username}
              setUserName={setUserName}
              isLogin={isAuth}
            />
          )}
        </Col>
        {isAuth && (
          <div className="user-login-container">
            <h3>Chào {username}</h3>
            <button
              onClick={() => {
                logout();
              }}
              className="log-out_btn"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </Row>
    </>
  );
};
export default HeaderComponent;
