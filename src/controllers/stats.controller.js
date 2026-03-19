import Subscription from "../models/Subscription.js"
import Transaction from "../models/transaction.js"

export const getStats = async (req, res) => {
  try {
    const userId = req.user.id

    const subscriptions = await Subscription.find({ userId })

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

    const subscriptionIds = subscriptions.map(sub => sub._id)
    // totalSpent
    const result = await Transaction.aggregate([
      {
        $match: {
          subscriptionId: { $in: subscriptionIds }
        }
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" }
        }
      }
    ])

    const totalSpent = result.length > 0 ? result[0].totalSpent : 0

    return res.status(200).json({
      totalSubscriptions,
      activeSubscriptions,
      cancelledSubscriptions,
      totalSpent
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
}

export default { getStats }