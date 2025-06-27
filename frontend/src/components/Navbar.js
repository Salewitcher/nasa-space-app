import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink to="/apod" className={({ isActive }) => isActive ? 'active' : ''}>
        APOD
      </NavLink>
      <NavLink to="/mars" className={({ isActive }) => isActive ? 'active' : ''}>
        Mars Rover Photos
      </NavLink>
      <NavLink to="/epic" className={({ isActive }) => isActive ? 'active' : ''}>
        EPIC Photos
      </NavLink>
      <NavLink to="/neo" className={({ isActive }) => isActive ? 'active' : ''}>
        Near Earth Objects
      </NavLink>
    </nav>
  );
};

export default Navbar;
