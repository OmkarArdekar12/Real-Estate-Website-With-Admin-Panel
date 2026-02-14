import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import heroRoutes from "./routes/heroRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import amenityRoutes from "./routes/amenityRoutes.js";
import constructionRoutes from "./routes/constructionRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import connectToDatabase from "./config/dbConnect.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import MongoStore from "connect-mongo";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

connectToDatabase();

const PORT = process.env.PORT || 8080;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://realestate-horizons.vercel.app";

const corsOptions = {
  origin: [FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
});

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 3,
    },
  }),
);

app.use("/api/admin", adminRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/construction", constructionRoutes);
app.use("/api/faqs", faqRoutes);

app.get("/", (req, res) => {
  return res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
      <h1>RealEstate Backend is Running</h1>
      <p>Admin Panel & API Server is active.</p>
      <a 
        href="${FRONTEND_URL}" 
        target="_blank"
        style="
          display:inline-block;
          margin-top:20px;
          padding:12px 25px;
          background-color:#facc15;
          color:black;
          text-decoration:none;
          font-weight:bold;
          border-radius:8px;
        "
      >
        Visit RealEstate-Horizons Website
      </a>
    </div>
  `);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`RealEstate Backend Server running on port ${PORT}`);
});
