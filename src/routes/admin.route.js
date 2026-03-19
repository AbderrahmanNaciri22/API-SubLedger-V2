import express from "express";
import { protectRoute, requireAdmin } from "../middlewares/authMiddleware.js";
import { getUserSubscriptions ,getUsers,getUsersById , getTransactionsByUserId , getTransactionsBySubscriptionId,getTotalDepanceAbonnement ,getTotalDepanceGlobal} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/subscription/:id",protectRoute,requireAdmin,getUserSubscriptions,);
router.get("/users",protectRoute,requireAdmin,getUsers);
router.get("/users",protectRoute,requireAdmin,getUsers);
router.get("/users/:id",protectRoute,requireAdmin,getUsersById);
router.get("/users/:id/transactions",protectRoute,requireAdmin,getTransactionsByUserId);
router.get("/subscriptions/:id/transactions",protectRoute,requireAdmin,getTransactionsBySubscriptionId);
router.get("/subscriptions/:id/totaldepanceabonnement",protectRoute,requireAdmin,getTotalDepanceAbonnement);
router.get("/subscriptions/totaldepanceglobal",protectRoute,requireAdmin,getTotalDepanceGlobal);















export default router;
