import { Avatar, Input, Badge } from "antd";
import "./HeadUser.scss";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../../redux/configureStore";

const HeadUser = () => {
  const currentUser = useSelector((state) => state.Auth.currentUser);
  const curentUserPhoto = useSelector((state) => state.Auth.curentUserPhoto);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(AuthAction.logOut());
    dispatch(AuthAction.setCurrentUser(null));
  };
  const nameFind = useSelector((state) => state.Auth.nameFind);
  const onChangeFindPeople = (event) => {
    dispatch(AuthAction.setNameFind(event.target.value));
  };
  const [isOpenNav, setIsOpenNav] = useState(false);
  return (
    <>
      <div className="head-container">
        <div className="current-user-container">
          <div className="avatar-container">
            <Badge dot color="green">
              <Avatar src={curentUserPhoto} icon={<UserOutlined />} />
            </Badge>
          </div>
          <div className="user-detail">
            <h4>{currentUser}</h4>
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
                <button className="btn-logOut" onClick={logOut}>
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="input-feild">
        <Input.Search
          placeholder="find people"
          value={nameFind}
          onChange={onChangeFindPeople}
        />
      </div>
    </>
  );
};
export default HeadUser;
