import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentGrid from './StudentGrid';

const App = () => {
  const [activePage, setActivePage] = useState('form');

  const handleFormSubmit = (newStudent) => {
   
    console.log('New Student:', newStudent);
    setActivePage('grid');
  };

  const handleDelete = (deletedStudentId) => {
    
    console.log('Deleted Student ID:', deletedStudentId);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => setActivePage('form')}>Form</button>
          </li>
          <li>
            <button onClick={() => setActivePage('grid')}>Grid</button>
          </li>
        </ul>
      </nav>

      {activePage === 'form' && <StudentForm onFormSubmit={handleFormSubmit} />}
      {activePage === 'grid' && <StudentGrid onDelete={handleDelete} />}
    </div>
  );
};

export default App;



