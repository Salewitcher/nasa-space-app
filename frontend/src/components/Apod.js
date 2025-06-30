import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Apod.css';

const Spinner = () => <div className="spinner" />;

const Apod = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApod = async () => {
      try {
        // Use environment variable for API base URL
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_BASE_URL}/api/apod`);
        setData(response.data);
      } catch (err) {
        setError('Failed to load Astronomy Picture of the Day.');
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="apod-container">
      <h2 className="apod-title">{data.title}</h2>
      {data.media_type === 'image' ? (
        <img src={data.url} alt={data.title} />
      ) : (
        <iframe
          src={data.url}
          title={data.title}
          frameBorder="0"
          allow="fullscreen"
          style={{ width: '100%', height: '500px' }}
        />
      )}
      <p className="apod-description">{data.explanation}</p>
    </div>
  );
};

export default Apod;
