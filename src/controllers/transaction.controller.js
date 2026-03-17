import Transaction from "../models/transaction.js"
import Subscription from "../models/Subscription.js"

export const createTransaction = async (req,res)=>{

    try{

        const {amount,paymentDate,subscriptionId} = req.body

        const subscription = await Subscription.findById(subscriptionId)

        if(!subscription){
            return res.status(404).json({message:"Subscription not found"})
        }

        // vérifier ownership
        if(subscription.userId.toString() !== req.user.id){
            return res.status(403).json({message:"Access denied"})
        }

        // vérifier si abonnement annulé
        if(subscription.status === "cancelled"){
            return res.status(400).json({
                message:"Cannot create transaction for cancelled subscription"
            })
        }

        const transaction = await Transaction.create({
            amount,
            paymentDate,
            subscriptionId
        })

        res.status(201).json(transaction)

    }catch(error){

        res.status(500).json({error:error.message})
    }

}