import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  getConstructionUpdates,
  createConstructionUpdate,
  updateConstructionUpdate,
  deleteConstructionUpdate,
} from "../controllers/constructionController.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getConstructionUpdates);
router.post("/", upload.single("image"), createConstructionUpdate);
router.put("/:id", upload.single("image"), updateConstructionUpdate);
router.delete("/:id", deleteConstructionUpdate);

export default router;
