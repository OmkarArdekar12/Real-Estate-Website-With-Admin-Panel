import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  getAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from "../controllers/amenityController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getAmenities);
router.post("/", isAdmin, upload.single("image"), createAmenity);
router.put("/:id", isAdmin, upload.single("image"), updateAmenity);
router.delete("/:id", isAdmin, deleteAmenity);

export default router;
