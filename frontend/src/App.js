import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [apod, setApod] = useState(null);
  const [loadingApod, setLoadingApod] = useState(true);
  const [errorApod, setErrorApod] = useState(null);

  const [marsPhotos, setMarsPhotos] = useState([]);
  const [loadingMars, setLoadingMars] = useState(false);
  const [errorMars, setErrorMars] = useState(null);

  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);

  // Fetch APOD on page load
  useEffect(() => {
    axios.get('http://localhost:5000/apod')
      .then(response => {
        setApod(response.data);
        setLoadingApod(false);
      })
      .catch(err => {
        setErrorApod('Error fetching APOD data');
        setLoadingApod(false);
      });
  }, []);

  // Fetch Mars Rover Photos when form is submitted
  const fetchMarsPhotos = async (e) => {
    e.preventDefault();
    setLoadingMars(true);
    setErrorMars(null);
    try {
      const response = await axios.get('http://localhost:5000/mars-photos', {
        params: { rover, sol }
      });
      setMarsPhotos(response.data);
    } catch (error) {
      setErrorMars('Error fetching Mars Rover photos');
    } finally {
      setLoadingMars(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>NASA Space App</h1>

      {/* Astronomy Picture of the Day */}
      <section style={{ marginBottom: '4rem' }}>
        <h2>Astronomy Picture of the Day</h2>
        {loadingApod && <p>Loading...</p>}
        {errorApod && <p>{errorApod}</p>}
        {apod && (
          <>
            <h3>{apod.title}</h3>
            {apod.media_type === 'image' && (
              <img src={apod.url} alt={apod.title} style={{ maxWidth: '80%', height: 'auto' }} />
            )}
            <p>{apod.date}</p>
            <p>{apod.explanation}</p>
          </>
        )}
      </section>

      {/* Mars Rover Photos */}
      <section>
        <h2>Mars Rover Photos</h2>
        <form onSubmit={fetchMarsPhotos} style={{ marginBottom: '2rem' }}>
          <label>
            Select Rover:
            <select value={rover} onChange={(e) => setRover(e.target.value)} style={{ margin: '0 1rem' }}>
              <option value="curiosity">Curiosity</option>
              <option value="opportunity">Opportunity</option>
              <option value="spirit">Spirit</option>
            </select>
          </label>
          <label>
            Sol (Martian Day):
            <input
              type="number"
              value={sol}
              onChange={(e) => setSol(e.target.value)}
              style={{ margin: '0 1rem' }}
            />
          </label>
          <button type="submit">Fetch Photos</button>
        </form>

        {loadingMars && <p>Loading Mars Photos...</p>}
        {errorMars && <p>{errorMars}</p>}

        <div className="photos-grid">
  {marsPhotos.length > 0 ? marsPhotos.map(photo => (
    <div key={photo.id} className="photo-card">
      <img
        src={photo.img_src}
        alt={`Mars Rover - ${photo.rover.name}`}
      />
      <p><strong>Rover:</strong> {photo.rover.name}</p>
      <p><strong>Camera:</strong> {photo.camera.full_name}</p>
      <p><strong>Earth Date:</strong> {photo.earth_date}</p>
    </div>
  )) : <p>No photos to display.</p>}
</div>

      </section>
    </div>
  );
}

export default App;
