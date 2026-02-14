import express from "express";
import { getHero, createOrUpdateHero } from "../controllers/heroController.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({ storage });

router.get("/", getHero);

router.post("/", upload.single("image"), createOrUpdateHero);

export default router;
