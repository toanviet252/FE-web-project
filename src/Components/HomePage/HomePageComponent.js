import React from "react";
import { Outlet } from "react-router-dom";
import "./homepage.scss";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isLogin = useSelector((state) => state.isAuthentication);
  return (
    <div className="home-page-container">
      {isLogin === false ? (
        <>
          <h1>Chào bạn đến với trang thương mại điện tử</h1>
          <p>Vui lòng đăng nhập hoặc đăng ký để sử dụng</p>
          <Outlet />
        </>
      ) : (
        <h1 className="login-true-header">Bắt đầu mua sắm thôi!</h1>
      )}
    </div>
  );
};
export default HomePage;
