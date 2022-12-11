import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    setUser(event.target.value);
    navigate("/");
  };

  const handleLogout = () => {
    setUser();
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
