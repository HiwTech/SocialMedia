import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

// In your AuthContext:
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("users")) || null
  );
  const [err, setErr] = useState(null);

  // Login function
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8880/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
      localStorage.setItem("users", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      // Optionally set an error state if you want to use it inside the context
      setErr(error.response?.data || error.message);
      // Throw the error so that it can be caught in the Login component
      throw error;
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("users", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

