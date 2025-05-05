import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EmployeeList from './components/Employee/EmployeeList';
import EmployeeForm from './components/Employee/EmployeeForm';
import Navbar from './components/Navbar';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<EmployeeForm />} />
            <Route path="/edit/:id" element={<EmployeeForm />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;