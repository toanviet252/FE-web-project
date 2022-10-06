import React from "react";
import { Outlet } from "react-router-dom";
import "./homepage.scss";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Welcome to ecommercal app</h1>
      <Outlet />
    </div>
  );
};
export default HomePage;
