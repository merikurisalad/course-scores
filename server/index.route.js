import { Router } from 'express';
import { getCourses, insertCourse } from './course.controller.js';

const router = Router();

router.get('/courses', getCourses);
router.post('/courses', insertCourse);

export default router;