const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000
const mysql = require('mysql2')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'CourseScoresDB',
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/courses', (req, res) => {
  const sqlSelect = `
    SELECT Courses.idCourse, Courses.courseCode, Courses.courseName, Components.idComponent AS componentId, Components.componentName, Components.componentWeight
    FROM Courses
    LEFT JOIN Components ON Courses.idCourse = Components.courseId
  `;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
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
});

app.post('/api/insert', (req, res)=> {
  
  const courseCode = req.body.courseCode
  const courseName = req.body.courseName
  const components = req.body.components;
  
  const sqlInsertCourse = "INSERT INTO Courses (courseCode, courseName) VALUES (?,?)";
  db.query(sqlInsertCourse, [courseCode, courseName], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const courseId = result.insertId;
      const sqlInsertComponents = "INSERT INTO Components (componentName, componentWeight, courseID) VALUES ?";
      const values = components.map(c => [c.name, c.weight, courseId]);
      db.query(sqlInsertComponents, [values], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send("Successfully inserted data");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})