import { Router } from 'express';
import { getCourses, insertCourse, deleteCourse, updateCourse } from './course.controller.js';

const router = Router();

router.get('/courses', getCourses);
router.post('/courses', insertCourse);
router.delete('/courses/:id', deleteCourse);
router.put('/courses/:id', updateCourse);

export default router;