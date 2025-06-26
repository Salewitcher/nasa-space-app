import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EpicPhotos.css';

const EpicPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEpicPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/epic');
        setPhotos(response.data);
      } catch (err) {
        console.error('Error fetching EPIC data:', err.message);
        setError('Failed to load EPIC Earth images.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpicPhotos();
  }, []);

  const renderImageUrl = (photo) => {
    const dateParts = photo.date.split(' ')[0].split('-'); // [YYYY, MM, DD]
    const [year, month, day] = dateParts;
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${photo.image}.jpg`;
  };

  return (
    <div className="epic-container">
      <h2 className="epic-heading">EPIC Earth Photos</h2>

      {loading && <p className="epic-loading">Loading images...</p>}
      {error && <p className="epic-error">{error}</p>}
      {!loading && !error && photos.length === 0 && (
        <p className="epic-no-photos">No images found.</p>
      )}

      <div className="epic-grid">
        {photos.map((photo) => (
          <div className="epic-card" key={photo.identifier}>
            <img
              src={renderImageUrl(photo)}
              alt={`Earth from EPIC - ${photo.date}`}
            />
            <div className="epic-card-text">
              <p><strong>Date:</strong> {photo.date}</p>
              <p><strong>Caption:</strong> {photo.caption}</p>
              <p><strong>Coords:</strong> Lat {photo.centroid_coordinates.lat}, Lon {photo.centroid_coordinates.lon}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpicPhotos;
