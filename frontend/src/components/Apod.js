import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Apod.css';

const Apod = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await axios.get('http://localhost:5000/apod');
        setData(response.data);
      } catch (err) {
        setError('Failed to load Astronomy Picture of the Day.');
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  if (loading) return <p>Loading APOD...</p>;
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
        ></iframe>
      )}
      <p className="apod-description">{data.explanation}</p>
    </div>
  );
};

export default Apod;
