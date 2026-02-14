import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  getSections,
  getSectionByType,
  createOrUpdateSection,
} from "../controllers/sectionController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getSections);
router.get("/:type", getSectionByType);
router.post("/", isAdmin, upload.single("image"), createOrUpdateSection);

export default router;
