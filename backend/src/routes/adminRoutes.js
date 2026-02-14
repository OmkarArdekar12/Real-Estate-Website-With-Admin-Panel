import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.get("/check", (req, res) => {
  if (req.session.isAdmin) {
    return res.json({ isAdmin: true });
  }
  res.json({ isAdmin: false });
});

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

export default router;
