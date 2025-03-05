import express from 'express'

import { getAllCourses, getCourseById, deleteCourseById, addCourse, updateCourse } from '../controllers/course.js'
import { isUserIn } from '../middlewares/isUserIn.js';

const router = express.Router();

router.get("/", getAllCourses)
router.get("/:id", getCourseById)
router.delete("/:id", deleteCourseById)
router.post("/", isUserIn, addCourse)
router.put("/:id", updateCourse)

export default router