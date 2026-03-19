import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import Transaction from "../models/transaction.js";



export const getUserSubscriptions = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscriptions = await Subscription.find({ userId }).populate(
      "userId",
      "-password",
    );

    res.status(200).json({
      user,
      totalSubscriptions: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    console.log("Error in getUserSubscriptions controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUsers = async (req, res) => {
  try{
      const Users = await User.find();
      return res.status(200).json(Users);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}
export const getUsersById = async (req, res) => {
  try{
      const userId = req.params.id
      const UserData = await User.findById(userId);
      return res.status(200).json(UserData);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

export const getTransactionsByUserId = async (req,res) => {
  try{
    const userId = req.params.id;
    const subscription = await Subscription.find({ userId }).select("_id");
    const subscriptionIds  = subscription.map(sub => sub._id);
    const transaction = await Transaction.find({
      subscriptionId : {$in : subscriptionIds}
    })
    return res.status(200).json(transaction); 
  }catch(error){
    res.status(500).json({ message: error.message });
  }  
}
export const getTransactionsBySubscriptionId = async (req,res) => {
  try{
    const subscriptionId = req.params.id;
    const transaction = await Transaction.find({subscriptionId :subscriptionId })
    return res.status(200).json(transaction); 
  }catch(error){
    res.status(500).json({ message: error.message });
  }  
}
export const getTotalDepanceAbonnement = async (req,res) => {
  try{
    const subscriptionId = req.params.id;
    let totalDepanceAbonnment = 0
    const transactions = await Transaction.find({subscriptionId :subscriptionId })
    transactions.forEach((transaction)=>{
        totalDepanceAbonnment += transaction.amount
    })
    return res.status(200).json(totalDepanceAbonnment); 
  }catch(error){
    res.status(500).json({ message: error.message });
  }  
}

export const getTotalDepanceGlobal = async (req,res) => {
  try{
    let totalDepanceGlobal = 0
    const transactions = await Transaction.find()
    transactions.forEach((transaction)=>{
        totalDepanceGlobal += transaction.amount
    })
    return res.status(200).json(totalDepanceGlobal); 
  }catch(error){
    res.status(500).json({ message: error.message });
  }  
}



