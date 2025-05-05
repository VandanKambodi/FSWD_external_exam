import React from 'react';

function EmployeeDetails({ employee, onClose }) {
  if (!employee) return null;
  return (
    <div className="modal">
      <h2>{employee.name}</h2>
      <p>Type: {employee.type}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      {employee.profilePic && (
        <img src={`http://localhost:5000/uploads/${employee.profilePic}`} alt="Profile" width={100} />
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default EmployeeDetails;