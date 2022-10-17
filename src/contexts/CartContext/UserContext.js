import { createContext, useState } from "react";

const UserContext = createContext();
const [userPhoto, setUserPhoto] = useState("#");
const UserContextProvider = ({ children }) => {
  const value = {
    userPhoto,
    setUserPhoto,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export { UserContext, UserContextProvider };
