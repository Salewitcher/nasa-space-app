import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarsRoverPhotos from './components/MarsRoverPhotos';

function App() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/apod')
      .then(response => {
        setApod(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>NASA Space App</h1>

      {/* Astronomy Picture of the Day */}
      <h2>{apod.title}</h2>
      {apod.media_type === 'image' && (
        <img src={apod.url} alt={apod.title} style={{ maxWidth: '80%', height: 'auto' }} />
      )}
      <p>{apod.date}</p>
      <p>{apod.explanation}</p>

      {/* Mars Rover Photos */}
      <MarsRoverPhotos />
    </div>
  );
}

export default App;
