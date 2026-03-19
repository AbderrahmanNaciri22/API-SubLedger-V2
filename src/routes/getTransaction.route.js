import express from "express";

import { protectRoute } from "../middlewares/authMiddleware.js";
import { getTransactionsBySubscription } from "../controllers/getTransactionsBySubscription.js";

const router = express.Router();
router.get(
  "/:id/transactions",
  protectRoute,
  getTransactionsBySubscription
);
export default router;