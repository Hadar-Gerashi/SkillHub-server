import express from 'express'

import {getAllCourses,getCourseById,deleteCourseById,addCourse,updateCourse} from '../controllers/course.js'

const router=express.Router();

router.get("/",getAllCourses)
router.get("/:id",getCourseById)
router.delete("/:id",deleteCourseById)
router.post("/",addCourse)
router.put("/:id",updateCourse)

export default router