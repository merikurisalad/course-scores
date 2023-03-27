import React, { useState } from 'react';
import api from '../axios.config.js';
import "./AddCourseModal.css";
import { Button, TextField, IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import toast, { Toaster } from 'react-hot-toast';

const AddCourseModal = ({ showModal, hideModal }) => {
  const [courseCode, setCourseCode] = useState('')
  const [courseName, setCourseName] = useState('')
  const [components, setComponents] = useState([{ name: '', weight: 0 }]);
  
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
         <div className="closeBtn">
            <IconButton onClick={() => hideModal(false)} aria-label="Close"><CloseIcon />
            </IconButton>
          </div>

          <div className="body">
            <p>
              <TextField
                id="outlined-basic" label="Course Code" variant="outlined" onChange={(e)=> {
                  setCourseCode(e.target.value)
                }}
              />

              <TextField
                id="outlined-basic" label="Course Name" variant="outlined" onChange={(e)=> {
                  setCourseName(e.target.value)
                }}
              />

              
              <div className="components">
              {components.map((component, index) => (
                <div key={index}>
                  <TextField
                    id="outlined-basic" label="Component Name" variant="outlined" onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index] = { ...component, name: e.target.value };
                      setComponents(newComponents);
                    }}
                  />

                  <TextField
                    id="outlined-basic" label="Component Weight" variant="outlined" onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index] = { ...component, weight: e.target.value };
                      setComponents(newComponents);
                    }}
                  />
                </div>
              ))}
              </div>
              <Button variant="contained" onClick={() => {
                const newComponents = [...components, { name: '', weight: 0 }];
                setComponents(newComponents);
                }}
                style={{float: 'left'}}
                >
                Add another component
              </Button>
            </p>
          </div>
          
          <div className="footer">

            <Button variant="contained" onClick={() => 
              hideModal(false)}
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

