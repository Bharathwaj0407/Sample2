import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';
import './StudentGrid.css'

const StudentGrid = ({ onDelete }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mode, setMode] = useState('grid'); // 'grid', 'edit', 'view'

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

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setMode('edit');
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setMode('view');
  };

  const handleFormSubmit = (updatedStudent) => {
   // console.log('Updated Student:', updatedStudent);
    setSelectedStudent(null);
    setMode('grid');
    fetchData();
  };

  return (
    <div>
      <h2>Student Grid</h2>
      {mode === 'grid' && (
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
              <td></td>
                <td>
                  <button onClick={() => handleDelete(student.student_id)}>Delete</button>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                  <button onClick={() => handleView(student)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {mode === 'edit' && (
        <StudentForm
          onFormSubmit={handleFormSubmit}
          initialData={selectedStudent}
        />
      )}
      {mode === 'view' && (
        <div>
          <h3>View Student</h3>
          <p>{`Name: ${selectedStudent.student_name}`}</p>
          <p>{`Dob: ${selectedStudent.dob}`}</p>
          <p>{`Age: ${selectedStudent.age}`}</p>
          <p>{`CreatedUserName: ${selectedStudent.created_user_name}`}</p>
          <p>{`UpdatedUserName: ${selectedStudent.updated_user_name}`}</p>
          <p>{`Subject1: ${selectedStudent.subject1}`}</p>
          <p>{`Mark1: ${selectedStudent.mark1}`}</p>
          <p>{`Subject2: ${selectedStudent.subject2}`}</p>
          <p>{`M2ark: ${selectedStudent.mark2}`}</p>

          
          <button onClick={() => setMode('grid')}>Back to Grid</button>
        </div>
      )}
    </div>
  );
};

export default StudentGrid;