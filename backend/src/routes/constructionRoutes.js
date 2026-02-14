import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  getConstructionUpdates,
  createConstructionUpdate,
  updateConstructionUpdate,
  deleteConstructionUpdate,
} from "../controllers/constructionController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getConstructionUpdates);
router.post("/", isAdmin, upload.single("image"), createConstructionUpdate);
router.put("/:id", isAdmin, upload.single("image"), updateConstructionUpdate);
router.delete("/:id", isAdmin, deleteConstructionUpdate);

export default router;
