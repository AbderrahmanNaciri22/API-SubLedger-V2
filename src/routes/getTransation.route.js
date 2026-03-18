import express from "express";

import { protectRoute } from "../middlewares/authMiddleware";
import { getTransactionsBySubscription } from "../controllers/getTransactionsBySubscription";

const router = express.Router();
router.get(
  "/:id/transactions",
  protectRoute,
  getTransactionsBySubscription
);