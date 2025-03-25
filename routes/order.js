import express from 'express'

import {getAllOrders,addOrder,deleteOrderById,getOrdersByUser} from '../controllers/order.js'
import { isUserIn } from '../middlewares/isUserIn.js';

const router=express.Router();

router.get("/",getAllOrders)
router.delete("/:id",isUserIn,deleteOrderById)
router.post("/",isUserIn,addOrder)
router.get("/:userId",getOrdersByUser)


export default router