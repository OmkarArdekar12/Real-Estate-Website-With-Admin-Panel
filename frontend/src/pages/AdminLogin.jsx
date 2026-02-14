import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { FaLock, FaLockOpen } from "react-icons/fa";

import toast from "react-hot-toast";
import ButtonLoader from "../components/common/ButtonLoader";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required", { id: "login-error" });
    }

    if (!password.trim()) {
      return toast.error("Password is required", { id: "login-error" });
    }

    try {
      setLoading(true);

      const isAuthorized = await login(email, password);

      if (isAuthorized) {
        toast.success("Login Successful", { id: "login-success" });
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials", { id: "login-error" });
      }
    } catch (err) {
      toast.error("Login failed", { id: "login-error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-10">
        <div className="flex flex-col gap-2 items-center justify-center">
          <img src="/Logo.png" alt="Real Estate" className="w-[60%] h-auto" />
          <h2 className="text-3xl font-serif font-bold text-center pb-8">
            Admin Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block pl-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-yellow-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label
              className="block pl-1 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-yellow-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-yellow-500 cursor-pointer"
            >
              {showPassword ? (
                <FaEyeSlash className="size-5" />
              ) : (
                <FaEye className="size-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-semibold transition ${
              loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
            }`}
          >
            {loading && <ButtonLoader />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
