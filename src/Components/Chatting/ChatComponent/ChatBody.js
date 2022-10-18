import "./ChatBody.scss";
import React from "react";
import { Row, Col } from "antd";
import HeadUser from "../HeadUser/HeadUser";

const ChatBody = () => {
  return (
    <>
      <div className="body-chat-wrapper">
        <Row className="body-main">
          <Col lg={8} sm={24} className="sidebar-chat">
            <HeadUser />
          </Col>
          <Col span={16} sm={0} className="message-body">
            message body
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ChatBody;
