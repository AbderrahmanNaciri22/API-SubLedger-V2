import Subscription from "../models/Subscription.js";

export const cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Vérifier que l'abonnement appartient au user
    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Vérifier s'il est déjà annulé
    if (subscription.status === "cancelled") {
      return res.status(400).json({ message: "Subscription already cancelled" });
    }

    // Annulation
    subscription.status = "cancelled";
    subscription.cancelledAt = new Date();

    await subscription.save();

    res.status(200).json({
      message: "Subscription cancelled successfully",
      subscription,
    });
  } catch (error) {
    console.log("Error in cancelSubscription controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};