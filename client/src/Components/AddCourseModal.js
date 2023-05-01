import React, { useState } from 'react';
import api from '../axios.config.js';
import "./AddCourseModal.css";
import { Button, TextField, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const AddCourseModal = ({ showModal, hideModal }) => {
  const [courseCode, setCourseCode] = useState('')
  const [courseName, setCourseName] = useState('')
  const [components, setComponents] = useState([{ name: '', weight: 0, max: 0 }]);

  const resetComponents = () => {
    setComponents([{ name: '', weight: 0, max: 0 }]);
  }
  
  const submitCourse = () => {
    api.post('/api/courses', {
      courseCode: courseCode,
      courseName: courseName,
      components: components
    }).then(() => {
      const displaySuccessNotification = () => {
        toast.success('Successfully added!')
      };
      displaySuccessNotification();
    })
  }

  return (
    <Modal
      open={showModal}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalContainer">
        <div className="header">
          <Typography align='left' variant='h5'>Add a new course:</Typography>
          <div className="closeBtn">
            <IconButton onClick={() => {
              hideModal(false);
              resetComponents(); // Call the resetComponents function when close button is clicked
            }} aria-label="Close"><CloseIcon />
            </IconButton>
          </div>
        </div>
          <div className="body">
            <p>
            <form autoComplete='off'>
              <TextField
                autoComplete='off'
                id="outlined-basic"
                label="Course Code"
                variant="outlined"
                onChange={(e)=> {
                  setCourseCode(e.target.value)
                }}
              />

              <TextField
                id="outlined-basic"
                label="Course Name"
                variant="outlined"
                onChange={(e)=> {
                  setCourseName(e.target.value)
                }}
              />

              
              <div className="components">
              {components.map((component, index) => (
                <div key={index}>
                  <TextField
                    id="outlined-basic"
                    label="Name (ex: Midterm)"
                    variant="outlined"
                    onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index] = { ...component, name: e.target.value };
                      setComponents(newComponents);
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Weight (ex: 30)"
                    variant="outlined"
                    onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index] = { ...component, weight: e.target.value };
                      setComponents(newComponents);
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Max Score (ex: 50)"
                    variant="outlined"
                    onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index] = { ...component, max: e.target.value };
                      setComponents(newComponents);
                    }}
                  />
                </div>
              ))}
              </div>
              </form>
              <Button variant="contained" onClick={() => {
                const newComponents = [...components, { name: '', weight: 0, max: 0 }];
                setComponents(newComponents);
                }}
                style={{float: 'left'}}
                >
                Add another component
              </Button>
            </p>
          </div>
          
          <div className="footer">

            <Button variant="contained" onClick={() => {
              hideModal(false);
              resetComponents(); // Call the resetComponents function when close button is clicked
            }}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            
            <Button variant="contained" onClick={submitCourse}>
              Submit
            </Button>
          </div>
        </div>
    </Modal>
  );
};

export default AddCourseModal;
