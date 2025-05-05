import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Employee List</h2>
      <button onClick={() => navigate('/add')}>Add Employee</button>
      <ul>
        {employees.map(emp => (
          <li key={emp._id}>
            {emp.name} ({emp.type})
            <button onClick={() => navigate(`/edit/${emp._id}`)}>Edit</button>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;