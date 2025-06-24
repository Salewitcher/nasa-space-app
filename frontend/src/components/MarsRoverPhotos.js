import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mars-photos');
        setPhotos(response.data);
      } catch (err) {
        console.error('Error fetching Mars Rover photos:', err.message);
        setError('Failed to load Mars Rover photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <p>Loading Mars Rover photos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mars Rover Photos</h2>
      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img
              src={photo.img_src}
              alt={`Mars Rover - ${photo.camera.full_name}`}
            />
            <p><strong>Rover:</strong> {photo.rover.name}</p>
            <p><strong>Camera:</strong> {photo.camera.full_name}</p>
            <p><strong>Earth Date:</strong> {photo.earth_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
