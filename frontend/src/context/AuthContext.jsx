import API from "../api/axios.js";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/admin/check");
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/admin/login", { email, password });
      setIsAdmin(true);
      return true;
    } catch (err) {
      setIsAdmin(false);
    }
  };

  const logout = async () => {
    try {
      await API.post("/admin/logout");
      setIsAdmin(false);
      return true;
    } catch (err) {
      console.log("Failed to logout");
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
