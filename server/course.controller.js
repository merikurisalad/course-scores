import { db } from './db/index.js'

export const getCourses = (req, res) => {
    const sqlSelect = `
      SELECT Courses.idCourse, Courses.courseCode, Courses.courseName, Components.idComponent AS componentId, Components.componentName, Components.componentWeight
      FROM Courses
      LEFT JOIN Components ON Courses.idCourse = Components.courseId
    `;
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred while fetching courses.' });
      } else {
        const courses = {};
        result.forEach((row) => {
          const courseId = row.idCourse;
          if (!courses[courseId]) {
            courses[courseId] = {
              id: courseId,
              courseCode: row.courseCode,
              courseName: row.courseName,
              components: [],
            };
          }
          if (row.componentId) {
            courses[courseId].components.push({
              id: row.componentId,
              componentName: row.componentName,
              componentWeight: row.componentWeight,
            });
          }
        });
        res.send(Object.values(courses));
      }
    });
};

export const insertCourse = (req, res) => {
    const courseCode = req.body.courseCode;
    const courseName = req.body.courseName;
    const components = req.body.components;
  
    const sqlInsertCourse = 'INSERT INTO Courses (courseCode, courseName) VALUES (?,?)';
    db.query(sqlInsertCourse, [courseCode, courseName], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred while inserting course.' });
      } else {
        const courseId = result.insertId;
        const sqlInsertComponents = 'INSERT INTO Components (componentName, componentWeight, maxScore, courseID) VALUES ?';
        const values = components.map((c) => [c.name, c.weight, c.max, courseId]);
        db.query(sqlInsertComponents, [values], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send({ message: 'An error occurred while inserting components.' });
          } else {
            console.log(result);
            res.send({ message: 'Successfully inserted data.' });
          }
        });
      }
    });
};

export const deleteCourse = async (req, res) => {
  const sqlDeleteCourse = 'DELETE FROM Courses WHERE idCourse = ?';
  try {
    const id = req.params.id;
    const result = await db.promise().query(sqlDeleteCourse, [id]);
    res.status(200).send(`Course with ID ${id} deleted.`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting course.');
  }
}