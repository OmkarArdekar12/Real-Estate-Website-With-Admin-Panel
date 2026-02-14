import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import CustomToaster from "./components/common/CustomNotification.jsx";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const hasVisited = localStorage.getItem("realestate_visited");
    if (!hasVisited) {
      toast.success("Welcome to Real Estate — Rising Beyond Horizons", {
        id: "welcome-toast",
        duration: 4000,
      });
      localStorage.setItem("realestate_visited", "true");
    }
  }, []);

  return (
    <div className="App">
      <CustomToaster />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
