import "./ChatBody.scss";
import React from "react";
import { Row, Col } from "antd";
import HeadUser from "../HeadUser/HeadUser";
import UserKit from "../UserKit/UserKit";

const ChatBody = () => {
  return (
    <>
      <div className="body-chat-wrapper">
        <Row className="body-main">
          <Col lg={10} sm={24} className="sidebar-chat">
            <HeadUser />
            <UserKit />
          </Col>
          <Col span={14} sm={0} className="message-body">
            message body
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ChatBody;
