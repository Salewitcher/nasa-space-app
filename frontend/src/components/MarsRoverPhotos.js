import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MarsRoverPhotos.css';

const roverCameras = {
  curiosity: [
    { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
    { name: 'RHAZ', full_name: 'Rear Hazard Avoidance Camera' },
    { name: 'MAST', full_name: 'Mast Camera' },
    { name: 'CHEMCAM', full_name: 'Chemistry and Camera Complex' },
    { name: 'MAHLI', full_name: 'Mars Hand Lens Imager' },
    { name: 'MARDI', full_name: 'Mars Descent Imager' },
    { name: 'NAVCAM', full_name: 'Navigation Camera' },
  ],
  opportunity: [
    { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
    { name: 'RHAZ', full_name: 'Rear Hazard Avoidance Camera' },
    { name: 'NAVCAM', full_name: 'Navigation Camera' },
    { name: 'PANCAM', full_name: 'Panoramic Camera' },
    { name: 'MINITES', full_name: 'Miniature Thermal Emission Spectrometer (Mini-TES)' },
  ],
  spirit: [
    { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
    { name: 'RHAZ', full_name: 'Rear Hazard Avoidance Camera' },
    { name: 'NAVCAM', full_name: 'Navigation Camera' },
    { name: 'PANCAM', full_name: 'Panoramic Camera' },
    { name: 'MINITES', full_name: 'Miniature Thermal Emission Spectrometer (Mini-TES)' },
  ],
};

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);
  const [camera, setCamera] = useState('');

  const [useSol, setUseSol] = useState(true);
  const [earthDate, setEarthDate] = useState('');

  // Fetch photos based on filters
  const fetchPhotos = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        rover,
      };

      if (useSol) {
        params.sol = sol;
      } else if (earthDate) {
        params.earth_date = earthDate;
      }

      if (camera) params.camera = camera;

      const response = await axios.get('http://localhost:5000/api/mars-photos', { params });
      const limitedPhotos = response.data.slice(0, 20);
      setPhotos(limitedPhotos);

      if (limitedPhotos.length === 0) {
        setError('No photos found for these filters.');
      }
    } catch (err) {
      console.error('Error fetching Mars Rover photos:', err.message);
      setError('Failed to load Mars Rover photos.');
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch photos on initial load with default values
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Reset camera when rover changes
  useEffect(() => {
    setCamera('');
  }, [rover]);

  return (
    <div className="mars-container">
      <h2 className="mars-heading">Mars Rover Photos</h2>

      <div className="mars-controls">
        <label className="mars-label">
          Rover:
          <select
            className="mars-select"
            value={rover}
            onChange={e => setRover(e.target.value)}
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </label>

        <label className="mars-label">
          Search by:
          <select
            className="mars-select"
            value={useSol ? 'sol' : 'earth_date'}
            onChange={e => setUseSol(e.target.value === 'sol')}
          >
            <option value="sol">Sol (Martian day)</option>
            <option value="earth_date">Earth Date</option>
          </select>
        </label>

        {useSol ? (
          <label className="mars-label">
            Sol:
            <input
              type="number"
              className="mars-input"
              min="0"
              value={sol}
              onChange={e => setSol(e.target.value)}
            />
          </label>
        ) : (
          <label className="mars-label">
            Earth Date:
            <input
              type="date"
              className="mars-input"
              value={earthDate}
              onChange={e => setEarthDate(e.target.value)}
            />
          </label>
        )}

        <label className="mars-label">
          Camera:
          <select
            className="mars-select"
            value={camera}
            onChange={e => setCamera(e.target.value)}
          >
            <option value="">All</option>
            {roverCameras[rover].map(cam => (
              <option key={cam.name} value={cam.name}>
                {cam.full_name}
              </option>
            ))}
          </select>
        </label>

        <button className="mars-button" onClick={fetchPhotos}>
          Search
        </button>
      </div>

      {loading && <div className="mars-spinner"></div>}
      {error && !loading && <p className="mars-error">{error}</p>}

      {!loading && !error && photos.length > 0 && (
        <div className="photos-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-card">
              <img
                src={photo.img_src}
                alt={`Mars Rover - ${photo.camera.full_name}`}
              />
              <div className="photo-card-text">
                <p><strong>Rover:</strong> {photo.rover.name}</p>
                <p><strong>Camera:</strong> {photo.camera.full_name}</p>
                <p><strong>Earth Date:</strong> {photo.earth_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarsRoverPhotos;
