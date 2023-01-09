import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {

  const [courseCode, setCourseCode] = useState('')
  const [courseName, setCourseName] = useState('')
  const [courseList, setCourseList] = useState([])

  useEffect(()=> {
    Axios.get('http://localhost:4000/api/get').then((response)=> {
      setCourseList(response.data)
      console.log(response.data)
    })
  }, [])

  const submitCourse = () => {
    Axios.post('http://localhost:4000/api/insert', {
      courseCode: courseCode,
      courseName: courseName,
    }).then(() => {
      alert("Successful insert")
    })
  }

  return (
    <div className="App">
      <h1>Course Scores App</h1>

      <div className="form">
        <label>Course Code:</label>
        <input type="text" name="courseCode" onChange={(e)=> {
          setCourseCode(e.target.value)
        }}/>
        <label>Course Name:</label>
        <input type="text" name="courseName" onChange={(e)=> {
          setCourseName(e.target.value)
        }}/>

        <button onClick={submitCourse}>Submit</button>

        {courseList.map((val)=> {
          return ( 
            <h2>
              Course Code: {val.courseCode} |  Course Name: {val.courseName}
            </h2>
          )
        })}
      </div>
    </div>
  )
}

/* function App() {
  const [joke, setJoke] = useState("");

  const getJoke = () => {
    Axios.get("https://official-joke-api.appspot.com/random_joke").then(
      (response) => {
        //setJoke(response.data.setup + " ... " + response.data.punchline); // displays random joke
        setJoke("Hello World!") // default response?
        }
    );
  };
  
  return (
    <div className="App">
      <header className="App-header">
        Test <button onClick={getJoke}>Click</button>
        {joke}
      </header>
    </div>
  );
} */

export default App;
