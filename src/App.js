import "./App.scss";
import Login from "./Components/Login/LoginComponent";
import ChatBody from "./Components/Chatting/ChatComponent/ChatBody";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<ChatBody />} />
      </Routes>
    </>
  );
}

export default App;
