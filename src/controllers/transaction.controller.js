import { ref, required } from "joi";
import mongoose from "mongoose";
import Subscription from "./Subscription";


const transactionSchema=new mongoose.Sechma({
    amount:{
        type:Number,
        required:true
    },
    paymentDate:{
        type:Date,
        required:true

    },
subscriptionId:{
        type:mongoose.Sechma.Types.ObjectId,
        ref:"Subscription"
    }
},
    {
        timestamps:true
    }


)
const Transaction=mongoose.model('Transaction',transactionSchema)
export default Transaction
