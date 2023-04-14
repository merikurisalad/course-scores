import React, { useState, useEffect } from 'react';
import api from '../axios.config.js';
import {
  Accordion, AccordionActions, AccordionDetails, AccordionSummary, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

    const handleComponentFieldChange = (componentId, fieldName, fieldValue) => {
      // Find the index of the component in the courseList
      const componentIndex = courseList.findIndex((course) =>
        course.components.some((component) => component.id === componentId)
      );
    
      // Make a copy of the courseList and the component to update
      const updatedCourseList = [...courseList];
      const updatedComponent = { ...updatedCourseList[componentIndex].components.find((component) => component.id === componentId) };
    
      // Update the component field value
      updatedComponent[fieldName] = fieldValue;
    
      // Update the component in the courseList
      updatedCourseList[componentIndex].components = updatedCourseList[componentIndex].components.map((component) =>
        component.id === componentId ? updatedComponent : component
      );
    
      // Update the state with the updated courseList
      setCourseList(updatedCourseList);
    };

    const handleComponentEditModeChange = (componentId, editMode) => {
      // Find the index of the component in the courseList
      const componentIndex = courseList.findIndex((course) =>
        course.components.some((component) => component.id === componentId)
      );
    
      // Make a copy of the courseList and the component to update
      const updatedCourseList = [...courseList];
      const updatedComponent = { ...updatedCourseList[componentIndex].components.find((component) => component.id === componentId) };
    
      // Update the edit mode
      updatedComponent.editMode = editMode;
    
      // Update the component in the courseList
      updatedCourseList[componentIndex].components = updatedCourseList[componentIndex].components.map((component) =>
        component.id === componentId ? updatedComponent : component
      );
    
      // Update the state with the updated courseList
      setCourseList(updatedCourseList);
    };
    

    const computeWeightedGrade = (components, componentGrades) => {
      let weightedGrade = 0;
      let weightedGradesByComponent = {};
      components.forEach((component) => {
        const grade = componentGrades[component.id] || 0;
        const componentWeightedGrade = (component.componentWeight / component.maxScore) * grade;
        weightedGrade += componentWeightedGrade;
        weightedGradesByComponent[component.id] = componentWeightedGrade.toFixed(2);
      });
      return { totalWeightedGrade: weightedGrade.toFixed(2), weightedGradesByComponent };
    };
    
    const renderComponents = (components) => {
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
              {component.editMode ? (
                  <input
                    type="string"
                    value={component.componentName}
                    onChange={(event) =>
                      handleComponentFieldChange(component.id, 'componentName', event.target.value)
                    }
                    onBlur={() => handleComponentEditModeChange(component.id, false)}
                  />
                ) : (
                  <span onClick={() => handleComponentEditModeChange(component.id, true)}>
                    {component.componentName}
                  </span>
                )}
              </TableCell>
              <TableCell align="right">
                {component.editMode ? (
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={component.componentWeight}
                    onChange={(event) =>
                      handleComponentFieldChange(component.id, 'componentWeight', event.target.value)
                    }
                    onBlur={() => handleComponentEditModeChange(component.id, false)}
                  />
                ) : (
                  <span onClick={() => handleComponentEditModeChange(component.id, true)}>
                    {component.componentWeight}
                  </span>
                )}
              </TableCell>
              <TableCell align="right">
                {component.editMode ? (
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={component.maxScore}
                    onChange={(event) =>
                      handleComponentFieldChange(component.id, 'maxScore', event.target.value)
                    }
                    onBlur={() => handleComponentEditModeChange(component.id, false)}
                  />
                ) : (
                  <span onClick={() => handleComponentEditModeChange(component.id, true)}>
                    {component.maxScore}
                  </span>
                )}
              </TableCell>
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
              <TableCell align="right">{computeWeightedGrade([component], componentGrades).weightedGradesByComponent[component.id]}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right" colSpan={4}>Total</TableCell>
            <TableCell align="right">{computeWeightedGrade(components, componentGrades).totalWeightedGrade}</TableCell>
          </TableRow>
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
              <Button variant="outlined">Update</Button>
              <ConfirmDelete onConfirm={() => handleDelete(course.id)}>
                Delete Course
              </ConfirmDelete>
          </AccordionActions>

          </Accordion>
        ))
      )}
      </div>
    );
}