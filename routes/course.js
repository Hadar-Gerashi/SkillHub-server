import express from 'express'

import {getAllCourses,getCourseById,deleteCourseById,addCourse,updateCourse,getTotalCount} from '../controllers/course.js'

const router=express.Router();

router.get("/:pageNum",getAllCourses)
router.get("/",getTotalCount)
router.get("/:id",getCourseById)
router.delete("/:id",deleteCourseById)
router.post("/",addCourse)
router.put("/:id",updateCourse)

export default router