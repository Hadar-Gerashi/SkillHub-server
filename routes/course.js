import express from 'express'

import { isUserIn } from '../middlewares/isUserIn.js';
import {getAllCourses,getCourseById,deleteCourseById,addCourse,updateCourse,getTotalCount} from '../controllers/course.js'


const router = express.Router();

router.get("/",getAllCourses)
router.get("/getCount",getTotalCount)
router.get("/:id",getCourseById)
router.delete("/:id",deleteCourseById)
router.post("/",addCourse)
router.put("/:id",updateCourse)

export default router