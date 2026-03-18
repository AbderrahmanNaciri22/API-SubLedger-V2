import Subscription from "../models/Subscription.js"

export const checkAbonnementTransaction = async (req, res, next) => {
  try {
    const { subscriptionId } = req.body

    if (!subscriptionId) {
      return res.status(400).json({ message: "remplir id de abonnement" })
    }

    const subscription = await Subscription.findById(subscriptionId)

    if (!subscription) {
      return res.status(404).json({ message: "abonnement de trouve pas dans stocke" })
    }


    if (subscription.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "n'a pas de le droit de cette utilisateur" })
    }

   
    if (subscription.status === "cancelled") {
      return res.status(400).json({
        message: "ne peut pas créé transaction de abonnement cancelled "
      })
    }

    // req ghada tmchi l controller
    req.subscription = subscription
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}