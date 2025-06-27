import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Apod from './components/Apod';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import EpicPhotos from './components/EpicPhotos';
import NeoObjects from './components/NeoObjects';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>NASA Space App</h1>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            APOD
          </NavLink>
          <NavLink to="/rover" className={({ isActive }) => (isActive ? 'active' : '')}>
            Mars Rover
          </NavLink>
          <NavLink to="/epic" className={({ isActive }) => (isActive ? 'active' : '')}>
            EPIC
          </NavLink>
          <NavLink to="/neo" className={({ isActive }) => (isActive ? 'active' : '')}>
            NEOs
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Apod />} />
          <Route path="/rover" element={<MarsRoverPhotos />} />
          <Route path="/epic" element={<EpicPhotos />} />
          <Route path="/neo" element={<NeoObjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
