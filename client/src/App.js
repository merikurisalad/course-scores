import React, { useState } from "react";
import './App.css';
import AddCourseModal from "./Components/AddCourseModal"
import CourseList from "./Components/CourseList"
import Button from '@mui/material/Button';

function App() {
  
  const [showModal, setShowModal] = useState(false)

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Course Scores App</h1>
        <Button variant="contained" onClick={() => setShowModal(true)}>
          Add Course
        </Button>
        <AddCourseModal showModal={showModal} hideModal={hideModal} />
      </div>
      <CourseList></CourseList>
    </div>
  )
}

export default App;
