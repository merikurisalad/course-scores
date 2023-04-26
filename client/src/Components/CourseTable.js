import React, { useState, useEffect } from 'react';
import api from '../axios.config.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function CourseTable() {
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
      api.get('/api/courses').then((response) => {
        setCourseList(response.data);
      });
    }, []);

    function createData(courseCode, courseName, totalGrade) {
        return { courseCode, courseName, totalGrade };
    }

    const rows = courseList.map((course) => {
        return createData(course.courseCode, course.courseName, course.totalGrade);
    });

    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Code</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Total Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.courseCode}>
                  <TableCell component="th" scope="row">
                    {row.courseCode}
                  </TableCell>
                  <TableCell>{row.courseName}</TableCell>
                  <TableCell>{row.totalGrade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }