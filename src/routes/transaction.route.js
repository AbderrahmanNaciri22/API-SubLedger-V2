import express from "express"
import {checkAbonnementTransaction} from "../middlewares/transactionMiddleware.js"

import {
createTransaction

} from "../controllers/transaction.controller.js"

import {protectRoute} from "../middlewares/authMiddleware.js"


const router = express.Router()


router.post("/createTransaction",protectRoute,checkAbonnementTransaction,createTransaction)



export default router