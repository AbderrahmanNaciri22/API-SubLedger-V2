import Subscription from "../models/Subscription.js"

export const getStats = async (req, res) => {
  try {
    const userId = req.user.id

    const subscriptions = await Subscription.find({ userId })

    // case: no subscriptions
    if (subscriptions.length === 0) {
      return res.status(200).json({
        totalSubscriptions: 0,
        activeSubscriptions: 0,
        cancelledSubscriptions: 0
      })
    }

    const totalSubscriptions = subscriptions.length

    const activeSubscriptions = subscriptions.filter(
      sub => sub.status === "active"
    ).length

    const cancelledSubscriptions = subscriptions.filter(
      sub => sub.status === "cancelled"
    ).length

    return res.status(200).json({
      totalSubscriptions,
      activeSubscriptions,
      cancelledSubscriptions
    })

  } catch (error) {
    console.log(error) // 👈 مهم باش تشوفي الخطأ الحقيقي
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

export default { getStats }