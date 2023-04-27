import React, { useState } from "react";
import './App.css';
import AddCourseModal from "./Components/AddCourseModal";
import CourseList from "./Components/CourseList";
import CourseTable from "./Components/CourseTable";
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  
  const [showModal, setShowModal] = useState(false)

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Toaster />
      <div className="header">
        <h1>Course Scores App</h1>
        <Button variant="contained" onClick={() => setShowModal(true)}>
          Add Course
        </Button>
        <AddCourseModal showModal={showModal} hideModal={hideModal} />
      </div>
      <div className="content">
        <CourseList></CourseList>
        <CourseTable></CourseTable>
      </div>
    </div>
  )
}

export default App;
