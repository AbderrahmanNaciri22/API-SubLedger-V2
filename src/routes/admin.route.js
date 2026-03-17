import express from "express";
import { protectRoute, requireAdmin } from "../middlewares/authMiddleware.js";
import { getUserSubscriptions ,getUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/subscriptions/:id",protectRoute,requireAdmin,getUserSubscriptions,);
router.get("/users",protectRoute,requireAdmin,getUsers);

export default router;
