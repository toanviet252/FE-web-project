import "./App.scss";
import Login from "./Components/Login/LoginComponent";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, Suspense } from "react";

import Loading from "./Components/Loading and Handle Error Page/LoadingPage/Loading";

// Sử dụng Lazy Loading
const RegisterUser = React.lazy(() =>
  import("./Components/RegisterUser/Register")
);
const ChatBody = React.lazy(() =>
  import("./Components/Chatting/ChatComponent/ChatBody")
);

function App() {
  const isAuth = useSelector((state) => state.Auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) return navigate("/");
    // eslint-disable-next-line
  }, [isAuth]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<ChatBody />} />
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
