// import { ref, required } from "joi";
import Joi from "joi";
import mongoose from "mongoose";
Joi.string().required();

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
  },
  {
    timestamps: true,
  },
);
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
