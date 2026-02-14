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
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 3000 * 60 * 60,
    },
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/api/admin", adminRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/construction", constructionRoutes);
app.use("/api/faqs", faqRoutes);

app.get("/", (req, res) => {
  return res.send("Real Estate Website with Admin Panel Backend is Running");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`RealEstate Backend Server running on port ${PORT}`);
});
