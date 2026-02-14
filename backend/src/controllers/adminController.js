import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "1234";

  if (email === adminEmail && password === adminPassword) {
    req.session.isAdmin = true;
    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

export const logoutAdmin = async (req, res) => {
  req.session.destroy(() => {
    return res.json({ message: "Logged out successfully" });
  });
};
