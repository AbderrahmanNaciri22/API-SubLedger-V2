import express from "express";

import authRoutes from "./routes/auth.route.js";
import subscriptionsRoutes from "./routes/subscription.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import getTransactionsRoutes from "./routes/getTransaction.route.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/subscriptions", getTransactionsRoutes);

export default app;
