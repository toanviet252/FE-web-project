import { Avatar } from "antd";
import "./messagebox.scss";

const MessageBox = () => {
  return (
    <div className="messages-body">
      <div className="message-feild">
        <div className="message-infor">
          <Avatar
            src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"
            className="avatar-mesg"
          />
          <span>
            <em>Just now</em>
          </span>
        </div>
        <div className="message-content">
          <p className="message-text">Hey, I'm Banh</p>
          <img
            className="message-img"
            src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"
            alt="cat"
          />
        </div>
      </div>
      <div className="message-feild owner">
        <div className="message-infor">
          <Avatar
            src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"
            className="avatar-mesg"
          />
          <span>
            <em>Just now</em>
          </span>
        </div>
        <div className="message-content">
          <p className="message-text">hello</p>
          <img
            className="message-img"
            src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"
            alt="cat"
          />
        </div>
      </div>
    </div>
  );
};
export default MessageBox;
