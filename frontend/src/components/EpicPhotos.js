import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EpicPhotos.css';

const Spinner = () => <div className="spinner" />;

const EpicPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchEpicPhotos = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/epic`, { params: { page } });
        setPhotos(response.data.photos);
        setTotal(response.data.total);
        if (response.data.photos.length === 0) {
          setError('No EPIC photos found.');
        }
      } catch (err) {
        setError('Failed to fetch EPIC photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpicPhotos();
  }, [page, API_BASE_URL]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const maxPage = Math.ceil(total / 20);

  if (loading) return <Spinner />;
  if (error) return <p className="epic-error">{error}</p>;

  return (
    <div className="epic-container">
      <h2 className="epic-title">EPIC Earth Photos</h2>

      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.identifier} className="photo-card">
            {/* EPIC image URL construction */}
            <img
              src={`https://epic.gsfc.nasa.gov/archive/natural/${photo.date.split(' ')[0].replace(/-/g, '/')}/png/${photo.image}.png`}
              alt={`EPIC Earth ${photo.identifier}`}
              loading="lazy"
            />
            <div className="photo-card-text">
              <p><strong>Date:</strong> {photo.date}</p>
              <p><strong>Caption:</strong> {photo.caption}</p>
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

export default EpicPhotos;
