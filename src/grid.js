

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentGrid = ({ onDelete }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/students/${studentId}`);
      onDelete(studentId);
      fetchData(); // Trigger a refetch after successful deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>Student Grid</h2>
      <table>
      <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Created User Name</th>
            <th>Updated User Name</th>
            <th>Subject 1</th>
            <th>Mark 1</th>
            <th>Subject 2</th>
            <th>Mark 2</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.student_name}</td>
              <td>{student.dob}</td>
              <td>{student.age}</td>
              <td>{student.created_user_name}</td>
              <td>{student.updated_user_name}</td>
              <td>{student.subject1}</td>
              <td>{student.mark1}</td>
              <td>{student.subject2}</td>
              <td>{student.mark2}</td>
              <td>
                <button onClick={() => handleDelete(student.student_id)}>Delete</button>
                <button type="submit">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGrid;
