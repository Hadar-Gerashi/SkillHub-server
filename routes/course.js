import express from 'express'

import { isManager } from '../middlewares/isUserIn.js';
import {getAllCourses,getCourseById,deleteCourseById,addCourse,updateCourse,getTotalCount,getCategories} from '../controllers/course.js'


const router = express.Router();

router.get("/",getAllCourses)
router.get("/getCount",getTotalCount)
router.get("/categories", getCategories)
router.get("/:id",getCourseById)
router.delete("/:id",isManager,deleteCourseById)
router.post("/",isManager,addCourse)
router.put("/:id",isManager,updateCourse)


export default router