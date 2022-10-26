import "./SendMessage.scss";
import { SendOutlined, FileImageOutlined } from "@ant-design/icons";
import { Upload, Tooltip, Input } from "antd";
import { useState } from "react";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.message.value);
    setMessage("");
  };
  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };
  // const props = {
  //   action: "//jsonplaceholder.typicode.com/posts/",
  //   listType: "picture",
  //   previewFile(file) {
  //     console.log("Your upload file", file);
  //     return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
  //       method: "POST",
  //       body: file,
  //     })
  //       .then((res) => res.json())
  //       .then(({ thumbnail }) => thumbnail);
  //   },
  // };
  const [selectedFile, setSelectedFile] = useState();
  const [isPickedFile, setisPikedFile] = useState(false);
  const onChangeHandler = (event) => {
    console.log(event.target.file);
    setSelectedFile(event.target.file[0]);
    setisPikedFile(true);
  };
  const handleSubmitUpload = () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
    console.log(formData);
    // fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((result) => console.log("succssed upload", result))
    //   .catch((err) => console.log(err));
  };
  return (
    <div>
      <form className="input-message-container" onSubmit={onSubmit}>
        <div className="input-message-feild">
          <Input.TextArea
            placeholder="Wrire something here!"
            name="message"
            id="message"
            autoSize={{
              minRows: 1,
              maxRows: 3,
            }}
            value={message}
            onChange={onChangeMessage}
          />
          {/* <Upload {...props}> */}
          <Tooltip title="Upload file" color="blue">
            <button className="add-image-btn">
              <FileImageOutlined />
            </button>
          </Tooltip>
          {/* </Upload> */}
        </div>

        <button
          className="send-btn btn"
          type="submit"
          // onClick={handleSubmitUpload}
        >
          <SendOutlined />
        </button>
      </form>
    </div>
  );
};
export default SendMessage;
