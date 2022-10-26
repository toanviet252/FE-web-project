import "./ContactUser.scss";
import { Contact } from "../../../shared/contact";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function RenderContact({ contact }) {
  return (
    <div className="contact-container">
      <Avatar icon={<UserOutlined />} className="avatar-contact" />
      <div className="contact-detail">
        <h3>{contact.name}</h3>
        <p>Hello</p>
      </div>
    </div>
  );
}

const ContactUser = () => {
  const nameFind = useSelector((state) => state.Auth.nameFind);
  const contactList = Contact.filter((contact) => {
    if (
      nameFind.trim().length > 0 &&
      !contact.name.toLowerCase().includes(nameFind.toLowerCase())
    ) {
      return false;
    }
    return true;
  }).map((contact) => {
    return <RenderContact contact={contact} key={contact.id} />;
  });
  return <div className="contact-user-container">{contactList}</div>;
};
export default ContactUser;
