import Transaction from "../models/Transaction.js"

export const createTransaction = async (req, res) => {
  try {
    const { paymentDate } = req.body

    // had abonnement jay mn middlware
    const subscription = req.subscription

    const transaction = await Transaction.create({
      amount: subscription.price,
      paymentDate: paymentDate ,
      subscriptionId: subscription._id
    })

    res.status(201).json({
      message: "Transaction created",
      transaction
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}