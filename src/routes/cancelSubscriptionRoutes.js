import express from "express";
import { cancelSubscription } from "../controllers/cancelSubscriptionController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// PATCH /api/subscriptions/:id/cancel
router.patch("/:id/cancel", protectRoute, cancelSubscription);

export default router;