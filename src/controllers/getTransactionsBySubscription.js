import Transaction from "../models/transaction.js";
import Subscription from "../models/Subscription.js";

// GET transactions for a subscription
export const getTransactionsBySubscription = async (req, res) => {
  try {
    const { id } = req.params; // subscriptionId
    const { page = 1, limit = 10 } = req.query;

    // 1️⃣ Vérifier ownership
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 2️⃣ Récupérer les transactions
    const transactions = await Transaction.find({ subscriptionId: id })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ paymentDate: -1 }); // newest first

    // 3️⃣ Total dépensé pour cet abonnement
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

    res.status(200).json({
      subscription: {
        _id: subscription._id,
        name: subscription.name,
        status: subscription.status,
      },
      totalSpent,
      transactions,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.log("Error on getTransactionsBySubscription", error);
    res.status(500).json({ message: "Internal server error" });
  }
};