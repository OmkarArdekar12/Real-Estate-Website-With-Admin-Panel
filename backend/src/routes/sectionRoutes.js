import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  getSections,
  getSectionByType,
  createOrUpdateSection,
} from "../controllers/sectionController.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getSections);
router.get("/:type", getSectionByType);
router.post("/", upload.single("image"), createOrUpdateSection);

export default router;
