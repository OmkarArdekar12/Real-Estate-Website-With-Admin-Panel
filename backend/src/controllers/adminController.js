import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.isAdmin = true;
  const token = jwt.sign(
    {
      email: process.env.ADMIN_EMAIL,
      role: "admin",
    },
    process.env.SESSION_SECRET,
    { expiresIn: "3h" },
  );

  return res.json({
    message: "Login successful",
    token,
  });
};

export const logoutAdmin = (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.log("Session destroy error:", err);
        }
      });
    }

    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Logout Error:", err.message);
    return res.status(500).json({ message: "Logout failed" });
  }
};
