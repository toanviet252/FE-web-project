import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.min.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import { CardContextProvider } from "./contexts/CartContext/CartContext";
import { UserContextProvider } from "./contexts/CartContext/UserContext";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <UserContextProvider>
          <CardContextProvider>
            <App />
          </CardContextProvider>
        </UserContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
