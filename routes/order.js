import express from 'express'

import {getAllOrders,addOrder,deleteOrderById,getOrdersByUser,updateConfirmation} from '../controllers/order.js'
import { isUserIn } from '../middlewares/isUserIn.js';

const router=express.Router();

router.get("/",getAllOrders)
router.delete("/:id",isUserIn,deleteOrderById)
router.post("/",isUserIn,addOrder)
router.get("/:userId",getOrdersByUser)
router.put("/:orderId",isUserIn,updateConfirmation)

export default router