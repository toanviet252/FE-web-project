import { Avatar, Input } from "antd";
import "./HeadUser.scss";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeadUser = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);
  return (
    <>
      <div className="head-container">
        <div className="current-user-container">
          <div className="avatar-container">
            <Avatar />
          </div>
          <div className="user-detail">
            <h4>User name</h4>
            <p>Status: </p>
          </div>
        </div>
        <div className="hidden-nav">
          <button className="icon-btn" onClick={() => setIsOpenNav(!isOpenNav)}>
            <MenuOutlined />
          </button>
          {isOpenNav && (
            <ul className="nav-list">
              <li className="list-item">Setting</li>
              <li className="list-item">Help and feedback</li>
              <li className="list-item">Keyboard Shortcuts</li>
              <li className="list-item">
                <Link to="/">Sign Out</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="input-feild">
        <Input.Search placeholder="find people" />
      </div>
    </>
  );
};
export default HeadUser;
