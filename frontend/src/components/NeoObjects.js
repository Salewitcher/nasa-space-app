import React, { useState, useEffect } from 'react';
import './NeoObjects.css'; // We'll create some styles for this

const NeoObjects = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNeos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/neo');
        if (!response.ok) {
          throw new Error('Failed to fetch NEO data');
        }
        const data = await response.json();
        setNeos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNeos();
  }, []);

  if (loading) return <p className="neo-loading">Loading Near Earth Objects...</p>;
  if (error) return <p className="neo-error">Error: {error}</p>;
  if (!neos.length) return <p className="neo-no-data">No Near Earth Objects detected for today.</p>;

  return (
    <div className="neo-container">
      <h2 className="neo-heading">Near Earth Objects - Today</h2>
      <div className="neo-grid">
        {neos.map((neo) => (
          <div key={neo.id} className="neo-card">
            <h3 className="neo-name">{neo.name}</h3>
            <p><strong>Diameter:</strong> {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}m - {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m</p>
            <p><strong>Potentially Hazardous:</strong> {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
            <p><strong>Closest Approach Date:</strong> {neo.close_approach_data[0]?.close_approach_date}</p>
            <p><strong>Relative Velocity:</strong> {parseFloat(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
            <p><strong>Miss Distance:</strong> {parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers).toFixed(2)} km</p>
            <a href={neo.nasa_jpl_url} target="_blank" rel="noopener noreferrer" className="neo-link">More Info</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeoObjects;
