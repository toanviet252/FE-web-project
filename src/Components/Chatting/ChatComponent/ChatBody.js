import "./ChatBody.scss";
import React from "react";
import { Row, Col } from "antd";
import HeadUser from "../HeadUser/HeadUser";
import UserKit from "../UserKit/UserKit";
import ContactUser from "../ContactUser/ContactUser";
import MessageBox from "../MessageBox/MessageBox";
import SendMessage from "../SendMessage/SendMessage";
import HeadChat from "../HeadChatBox/HeadChat";

const ChatBody = () => {
  return (
    <>
      <div className="body-chat-wrapper">
        <Row className="body-main">
          <Col lg={10} sm={16} xs={24} className="sidebar-chat">
            <HeadUser />
            <UserKit />
            <ContactUser />
          </Col>
          <Col lg={14} sm={8} xs={0} className="message-container">
            <HeadChat />
            <MessageBox />
            <SendMessage />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ChatBody;
