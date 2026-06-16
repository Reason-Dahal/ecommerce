import express from "express";
import { registerUser, loginUser , updateProfile,updatePassword, } from "../controller/userController.js";
import { protect,admin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.put("/updateProfile",protect, updateProfile);
router.put("/updatePassword",protect, updatePassword);
export default router;
