import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
          <Link to="/">APOD</Link>
          <Link to="/rover">Mars Rover</Link>
          <Link to="/epic">EPIC</Link>
          <Link to="/neo">NEOs</Link>
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
