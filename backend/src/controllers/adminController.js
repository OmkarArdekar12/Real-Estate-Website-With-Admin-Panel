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

  const token = jwt.sign(
    {
      email: process.env.ADMIN_EMAIL,
      role: "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" },
  );

  return res.json({
    message: "Login successful",
    token,
  });
};

export const logoutAdmin = async (req, res) => {
  req.session.destroy(() => {
    return res.json({ message: "Logged out successfully" });
  });
};
