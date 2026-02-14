import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  getAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from "../controllers/amenityController.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getAmenities);
router.post("/", upload.single("image"), createAmenity);
router.put("/:id", upload.single("image"), updateAmenity);
router.delete("/:id", deleteAmenity);

export default router;
