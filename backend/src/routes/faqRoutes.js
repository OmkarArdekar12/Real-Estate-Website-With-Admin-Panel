import express from "express";
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/faqController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", getFaqs);
router.post("/", isAdmin, createFaq);
router.put("/:id", isAdmin, updateFaq);
router.delete("/:id", isAdmin, deleteFaq);

export default router;
