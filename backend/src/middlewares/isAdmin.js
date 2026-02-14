import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  if (req.session?.isAdmin) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);

    if (decoded.role === "admin") {
      return next();
    }
    return res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
