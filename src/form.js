


import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    student_name: '',
    dob: '',
    age: '',
    created_user_name: '',
    updated_user_name: '',
    subject1: '',
    mark1: '',
    subject2: '',
    mark2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/students', formData);
      onFormSubmit(response.data);
      setFormData({
        student_name: '',
        dob: '',
        age: '',
        created_user_name: '',
        updated_user_name: '',
        subject1: '',
        mark1: '',
        subject2: '',
        mark2: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student Name:
        <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} required />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </label>
      <label>
        Created User Name:
        <input type="text" name="created_user_name" value={formData.created_user_name} onChange={handleChange} required />
      </label>
      <label>
        Updated User Name:
        <input type="text" name="updated_user_name" value={formData.updated_user_name} onChange={handleChange} required />
      </label>
      <label>
        Subject 1:
        <input type="text" name="subject1" value={formData.subject1} onChange={handleChange} required />
      </label>
      <label>
        Mark 1:
        <input type="number" name="mark1" value={formData.mark1} onChange={handleChange} required />
      </label>
      <label>
        Subject 2:
        <input type="text" name="subject2" value={formData.subject2} onChange={handleChange} required />
      </label>
      <label>
        Mark 2:
        <input type="number" name="mark2" value={formData.mark2} onChange={handleChange} required />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;