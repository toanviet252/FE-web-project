import "./App.scss";
import Login from "./Components/Login/LoginComponent";
import ChatBody from "./Components/Chatting/ChatComponent/ChatBody";
import RegisterUser from "./Components/RegisterUser/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const isAuth = useSelector((state) => state.Auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("App", isAuth);
    if (!isAuth) return navigate("/");
    // eslint-disable-next-line
  }, [isAuth]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<ChatBody />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </>
  );
}

export default App;
