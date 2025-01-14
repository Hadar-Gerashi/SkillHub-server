import express from 'express'

import {getAllOrders,addOrder,deleteOrderById,getOrdersByUser,updateConfirmation} from '../controllers/order.js'

const router=express.Router();

router.get("/",getAllOrders)
router.delete("/:id",deleteOrderById)
router.post("/",addOrder)
router.get("/:userId",getOrdersByUser)
router.put("/:orderId",updateConfirmation)

export default router