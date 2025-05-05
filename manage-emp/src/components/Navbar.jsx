import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <Link className="lgo" to="/">Home</Link>
      {isLoggedIn ? (
        <button className="nlg" onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link className="lg" to="/login">Login</Link>
          <Link className="lg" to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;