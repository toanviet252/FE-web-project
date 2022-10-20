import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userPhoto, setUserPhoto] = useState("");
  const [curuserName, setCurUserName] = useState(null);
  const value = {
    userPhoto,
    setUserPhoto,
    curuserName,
    setCurUserName,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export { UserContext, UserContextProvider };
