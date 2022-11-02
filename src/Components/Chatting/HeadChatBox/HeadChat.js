import "./HeadChat.scss";
import { SearchOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";

const HeadChat = () => {
  const chooseUserContact = useSelector(
    (state) => state.Auth.chooseContactUser
  );
  return (
    <div className="head-chat-container">
      <h2>{chooseUserContact?.displayName}</h2>
      <div className="chat-toolkit-container">
        <button className="kit-btn" style={{ marginRight: "0.8rem" }}>
          <Tooltip title="find message" color="blue">
            <SearchOutlined />
          </Tooltip>
        </button>

        <button className="kit-btn">
          <Tooltip title="video call" color="blue">
            <VideoCameraOutlined />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};
export default HeadChat;
