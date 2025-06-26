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
        // Assuming backend sends full data array, we map to desired structure:
        const photosData = response.data.slice(0, 10).map(photo => ({
          date: photo.date,
          image: `https://epic.gsfc.nasa.gov/archive/natural/${photo.date.split(' ')[0].replace(/-/g, '/')}/png/${photo.image}.png`,
          caption: photo.caption,
        }));
        setPhotos(photosData);
      } catch (err) {
        setError('Failed to load EPIC photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpicPhotos();
  }, []);

  if (loading) return <p>Loading Earth images from EPIC...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>NASA EPIC Earth Images</h2>
      <div className="photos-grid">
        {photos.map((photo, idx) => (
          <div key={idx} className="photo-card">
            <img src={photo.image} alt={photo.caption} />
            <p>{photo.caption}</p>
            <small>{new Date(photo.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpicPhotos;
