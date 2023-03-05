import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function CourseList() {
    const [courseList, setCourseList] = useState([]);
  
    useEffect(() => {
      Axios.get('http://localhost:4000/api/courses').then((response) => {
        setCourseList(response.data);
      });
    }, []);
  
    const renderComponents = (components) => {
      return (
        <ul>
          {components.map((component) => (
            <li key={component.id}>
              {component.componentName} ({component.componentWeight}%)
            </li>
          ))}
        </ul>
      );
    };
  
    return (
        <div style={{ width: '100%', margin: '0 auto', textAlign: 'left' }}>
        {courseList.map((course, index) => (
          <Accordion key={index} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <Typography>{course.courseCode} - {course.courseName}</Typography>
            </AccordionSummary>
            
            <AccordionDetails>
              <Typography>
                {renderComponents(course.components)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
}