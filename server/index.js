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

app.get('/api/get', (req, res)=> {
  const sqlSelect = "SELECT * FROM Courses"
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post('/api/insert', (req, res)=> {
  
  const courseCode = req.body.courseCode
  const courseName = req.body.courseName
  
  const sqlInsert = "INSERT INTO Courses (courseCode, courseName) VALUES (?,?)"
  db.query(sqlInsert, [courseCode, courseName], (err, result)=> {
    console.log(result)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 