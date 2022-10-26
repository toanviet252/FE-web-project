import "./HeadChat.scss";
import { SearchOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const HeadChat = () => {
  return (
    <div className="head-chat-container">
      <h2>Kha Banh</h2>
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
