import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EpicPhotos.css';

const Spinner = () => <div className="spinner" />;

const EpicPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEpicPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/epic');
        const photosWithUrls = response.data.map(photo => {
          const datePart = photo.date.split(' ')[0]; // 'YYYY-MM-DD'
          const [year, month, day] = datePart.split('-');
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${photo.image}.png`;
          return {
            ...photo,
            imageUrl,
          };
        });
        setPhotos(photosWithUrls);

        if (photosWithUrls.length === 0) {
          setError('No EPIC photos found.');
        }
      } catch (err) {
        setError('Failed to load EPIC photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpicPhotos();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="epic-error">{error}</p>;

  return (
    <div className="epic-container">
      <h2 className="epic-title">NASA EPIC Earth Photos</h2>
      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.identifier} className="photo-card">
            <img
              src={photo.imageUrl}
              alt={`EPIC - ${photo.caption}`}
              loading="lazy"
            />
            <div className="photo-card-text">
              <p><strong>Date:</strong> {photo.date}</p>
              <p>{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpicPhotos;
