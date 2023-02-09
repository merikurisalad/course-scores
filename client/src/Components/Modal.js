import React, { useState } from 'react'
import "./Modal.css"
import Axios from 'axios';

function Modal({ hideModal }) {
    const [courseCode, setCourseCode] = useState('')
    const [courseName, setCourseName] = useState('')
    
    const submitCourse = () => {
        Axios.post('http://localhost:4000/api/insert', {
          courseCode: courseCode,
          courseName: courseName,
        }).then(() => {
            /*not working*/
            alert("Successful insert")
        })
      }
return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => hideModal(false)}> X </button>
            </div>
            <div className="title">
                <h1>Add a new course!</h1>
            
            
            </div>
            <div className="body">
                <p>
                    <label>Course Code:</label>
                    <input type="text" name="courseCode" onChange={(e)=> {
                        setCourseCode(e.target.value)
                    }}/>
                    <label>Course Name:</label>
                    <input type="text" name="courseName" onChange={(e)=> {
                        setCourseName(e.target.value)
                    }}/>
                </p>
            </div>
            
            
            <div className="footer">
                <button onClick={() => hideModal(false)} id="cancelBtn">Cancel</button>
                <button onClick={submitCourse}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Modal