import express from "express";
import { registerController, loginController, logoutController, refreshTokenController, getProfile, updateProfile } from "./controller.js";
import authenticateUser from "../../middleware/authentication.js";
import upload from '../config/upload.js'; // ✅ Import from `upload.js`

const router = express.Router();

router.post("/register", upload.single("image"), registerController);
router.post("/login", loginController);
router.post("/logout", authenticateUser, logoutController);
router.get("/profile", authenticateUser, getProfile);
router.put("/profile", upload.single("image"), authenticateUser, updateProfile);
router.post("/refresh-token", refreshTokenController);

export default router;
