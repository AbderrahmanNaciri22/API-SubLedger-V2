import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { userProfile } from "../controllers/user.controller.js";
// import {statsController} from "../controllers/stats.controller.js"

const router = express.Router();

router.get("/profile", protectRoute, userProfile);
// router.get("/statistiques", statsController)

export default router;
