import React, { useState, useEffect } from "react";
import Modal from "./Components/Modal"
import Axios from 'axios';
import './App.css';

function App() {
  const [courseList, setCourseList] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(()=> {
    Axios.get('http://localhost:4000/api/get').then((response)=> {
      setCourseList(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <div className="App">
      <div className="header">
        <h1>Course Scores App</h1>
        <button
          className="openModalBtn" onClick={() => {
            setShowModal(true)
          }}
        >Add Course
        </button>
      </div>
      {showModal && <Modal hideModal={setShowModal} />}

      <div>
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

export default App;
