'use client'; // Add this line at the top

import React from 'react';
import './Navbar.css';
import ThemeToggle from './ThemeToggle'; // Adjust the path as needed

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title"> 🌿 AI Resume Builder</h1>
        <ThemeToggle /> {/* Ensure this is only here once */}
      </div>
    </nav>
  );
};

export default Navbar;
