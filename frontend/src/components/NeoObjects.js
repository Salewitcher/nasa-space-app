import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NeoObjects.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const Spinner = () => <div className="spinner" />;

const Neo = () => {
  const [neos, setNeos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchNeos = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/api/neo', { params: { page } });
        setNeos(response.data.neos);
        setTotal(response.data.total);
        if (response.data.neos.length === 0) {
          setError('No Near-Earth Objects found.');
        }
      } catch (err) {
        setError('Failed to fetch Near-Earth Objects.');
      } finally {
        setLoading(false);
      }
    };

    fetchNeos();
  }, [page]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const maxPage = Math.ceil(total / 20);

  if (loading) return <Spinner />;
  if (error) return <p className="neo-error">{error}</p>;

  return (
    <div className="neo-container">
      <h2 className="neo-title">Near-Earth Objects (NEO)</h2>

      <table className="neo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Diameter (meters)</th>
            <th>Potentially Hazardous</th>
            <th>Close Approach Date</th>
            <th>Miss Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {neos.map(neo => (
            <tr key={neo.id}>
              <td>{neo.name}</td>
              <td>
                {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(1)} - {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}
              </td>
              <td>{neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</td>
              <td>{neo.close_approach_data[0]?.close_approach_date}</td>
              <td>{parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart Section */}
      <h3 className="neo-subtitle">Top 10 NEO Estimated Diameters (meters)</h3>
      <div className="neo-chart-container">
        <ResponsiveContainer>
          <BarChart data={neos.slice(0, 10).map(neo => ({
            name: neo.name,
            diameter: parseFloat(neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2))
          }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={120} stroke="#fff" />
            <YAxis stroke="#fff" label={{ value: 'Diameter (m)', angle: -90, position: 'insideLeft', fill: '#fff' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111', border: '1px solid #444', color: '#fff' }}
              itemStyle={{ color: '#66fcf1' }}
            />
            <Bar dataKey="diameter" fill="#66fcf1" />
          </BarChart>
        </ResponsiveContainer>
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

export default Neo;
