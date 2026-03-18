import express from "express"

import {
createTransaction

} from "../controllers/transaction.controller.js"

import {protectRoute} from "../middlewares/authMiddleware.js"


const router = express.Router()


router.post("/createTransaction",protectRoute,createTransaction)



export default router