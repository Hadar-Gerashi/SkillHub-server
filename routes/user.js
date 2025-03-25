import express from 'express'

import {getAllUser,getUserById,addUser,updateUser,updatePassword,logIn } from '../controllers/user.js'
import { isUserIn } from '../middlewares/isUserIn.js';

const router=express.Router();

router.get("/",getAllUser)
router.get("/:id",getUserById)
router.post("/",addUser)
router.put("/:id",isUserIn,updateUser)
router.put("/password/:id",isUserIn,updatePassword)
router.post("/logIn",logIn)


export default router