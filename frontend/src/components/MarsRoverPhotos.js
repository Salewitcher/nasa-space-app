import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MarsRoverPhotos.css';

const Spinner = () => <div className="spinner" />;

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);
  const [camera, setCamera] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/api/mars-photos', {
          params: { rover, sol, camera, page }
        });
        setPhotos(response.data.photos);
        setTotal(response.data.total);
        if (response.data.photos.length === 0) {
          setError('No photos found for this filter.');
        }
      } catch (err) {
        setError('Failed to fetch Mars Rover photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [rover, sol, camera, page]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const maxPage = Math.ceil(total / 20);

  if (loading) return <Spinner />;
  if (error) return <p className="mars-error">{error}</p>;

  return (
    <div className="mars-container">
      <h2 className="mars-title">Mars Rover Photos</h2>

      {/* Filter Controls (optional - add as you want) */}
      {/* Example: Rover select, Sol input, Camera select */}

      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.img_src} alt={`Mars by ${photo.rover.name}`} loading="lazy" />
            <div className="photo-card-text">
              <p><strong>Rover:</strong> {photo.rover.name}</p>
              <p><strong>Camera:</strong> {photo.camera.full_name}</p>
              <p><strong>Date:</strong> {photo.earth_date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
        <span>Page {page} / {maxPage}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, maxPage))} disabled={page === maxPage}>Next</button>
      </div>

      <button className="back-to-top" onClick={scrollToTop}>↑ Back to Top</button>
    </div>
  );
};

export default MarsRoverPhotos;
