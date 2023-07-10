import { createContext, useState, useEffect } from "react";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser !== null ? JSON.parse(storedUser) : false;
  });

  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const signIn = () => {
    setUser(true);
    toast.success(`Bienvenid@!`);
  };

  const signOut = () => {
    setUser(false);
    sendLogout();
    navigate("/");
    toast("Has cerrado sesión");
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {props.children}
      <Toaster position="bottom-left" reverseOrder={false} />
    </UserContext.Provider>
  );
};

export default UserProvider;
