import React from 'react';
import './App.css';
import Apod from './components/Apod';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import EpicPhotos from './components/EpicPhotos';

function App() {
  return (
    <div className="container">
      <h1>NASA Space App</h1>

      <section>
        <Apod />
      </section>

      <section>
        <MarsRoverPhotos />
      </section>

      <section>
        <EpicPhotos />
      </section>
    </div>
  );
}

export default App;
