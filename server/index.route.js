import { Router } from 'express';
import { getCourses, insertCourse, deleteCourse } from './course.controller.js';

const router = Router();

router.get('/courses', getCourses);
router.post('/courses', insertCourse);
router.delete('/courses/:id', deleteCourse);

export default router;