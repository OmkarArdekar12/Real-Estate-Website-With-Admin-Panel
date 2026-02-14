import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/check", isAdmin, (req, res) => {
  return res.json({ isAdmin: true });
});

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

export default router;
