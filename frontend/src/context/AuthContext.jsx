import API from "../api/axios.js";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const expiry = localStorage.getItem("adminExpiry");

      if (!token || !expiry) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      if (new Date().getTime() > parseInt(expiry)) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminExpiry");
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const res = await API.get("/admin/check");
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        setIsAdmin(false);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminExpiry");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/admin/login", { email, password });
      const token = res.data.token;
      const expiryTime = new Date().getTime() + 3 * 60 * 60 * 1000;
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminExpiry", expiryTime);
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
