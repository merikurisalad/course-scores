import React, { useState, useEffect } from 'react';
import api from '../axios.config.js';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ConfirmDelete from './ConfirmDelete';


export default function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const [componentGrades, setComponentGrades] = useState({});
  
    useEffect(() => {
      api.get('/api/courses').then((response) => {
        setCourseList(response.data);
      });
    }, []);

    const handleComponentGradeChange = (componentId, grade) => {
      setComponentGrades({
        ...componentGrades,
        [componentId]: grade,
      });
    };

    const computeWeightedGrade = (components) => {
      let weightedGrade = 0;
      components.forEach((component) => {
        const grade = componentGrades[component.id] || 0;
        weightedGrade += (component.componentWeight / component.maxScore) * grade;
      });
      return (weightedGrade).toFixed(2);
    };
    
    const renderComponents = (components) => {
      console.log(components)
      return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="components table">
        <TableHead>
          <TableRow>
            <TableCell>Component</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Max Score</TableCell>
            <TableCell align="right">User Inputted Grade</TableCell>
            <TableCell align="right">Weighted Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {components.map((component) => (
            <TableRow key={component.id}>
              <TableCell component="th" scope="row">
                {component.componentName}
              </TableCell>
              <TableCell align="right">{component.componentWeight}%</TableCell>
              <TableCell align="right">{component.maxScore}</TableCell>
              <TableCell align="right">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={componentGrades[component.id] || ''}
                  onChange={(event) =>
                    handleComponentGradeChange(
                      component.id,
                      event.target.valueAsNumber
                    )
                  }
                />
              </TableCell>
              <TableCell align="right">{computeWeightedGrade([component])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


    const handleDelete = (id) => {
      api.delete(`api/courses/${id}`).then(() => {
        setCourseList(courseList.filter((course) => course.id !== id));
      });
    };
  
    return (
        <div style={{ width: '100%', margin: '0 auto', textAlign: 'left' }}>
        {courseList.length === 0 ? (
                <p>There are no added courses!</p>
            ) : (
        courseList.map((course, index) => (
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

            <AccordionActions>
              <ConfirmDelete onConfirm={() => handleDelete(course.id)}>
                Delete
              </ConfirmDelete>
          </AccordionActions>

          </Accordion>
        ))
      )}
      </div>
    );
}