-- Drop the tables if they exist
DROP TABLE IF EXISTS Components;
DROP TABLE IF EXISTS Courses;

-- Create the courses table
CREATE TABLE Courses (
  idCourse INT AUTO_INCREMENT PRIMARY KEY,
  courseCode VARCHAR(255),
  courseName VARCHAR(255),
  totalGrade FLOAT DEFAULT 0
);

-- Insert sample data into the courses table
INSERT INTO Courses (idCourse, courseCode, courseName)
VALUES (1, 'CSE101', 'Introduction to Computer Science'),
       (2, 'MATH201', 'Calculus I'),
       (3, 'ENG101', 'English Composition');

-- Create the components table with a foreign key to the courses table
CREATE TABLE Components (
  idComponent INT AUTO_INCREMENT PRIMARY KEY,
  componentName VARCHAR(255),
  componentWeight INT,
  maxScore INT,
  courseID INT,
  FOREIGN KEY (courseID) REFERENCES courses(idCourse) ON DELETE CASCADE
);

-- Insert sample data into the components table with componentWeight values that amount to 100 for each courseID
INSERT INTO Components (idComponent, componentName, componentWeight, maxScore, courseID)
VALUES (1, 'Midterm Exam', 30, 100, 1),
       (2, 'Final Exam', 40, 100, 1),
       (3, 'Homework', 30, 100, 1),
       (4, 'Quiz 1', 15, 50, 2),
       (5, 'Quiz 2', 15, 50, 2),
       (6, 'Essay', 40, 100, 3),
       (7, 'Presentation', 60, 100, 3);
