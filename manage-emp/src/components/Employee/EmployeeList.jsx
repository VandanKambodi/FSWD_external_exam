import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import './EL.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/employees').then(res => setEmployees(res.data));
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/employees/${id}`);
    setEmployees(employees.filter(emp => emp._id !== id));
  };

  return (
    <div className='emp-list'>
      <h2>Employee List</h2>
      <button className='ad' onClick={() => navigate('/login/add')}>Add Employee</button>
      <ul className='list'>
        {employees.map(emp => (
          <li key={emp._id}>
            {emp.name} ({emp.type})
            <button className='edit' onClick={() => navigate(`/edit/${emp._id}`)}>Edit</button>
            <button className='edit' onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;