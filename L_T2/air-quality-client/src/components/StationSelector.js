import React, { useEffect, useState } from 'react';
import { getStations } from '../services/api';

const StationSelector = ({ onSelect }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStations() {
      try {
        const data = await getStations();
        setStations(data);
      } catch (err) {
        setError('Не вдалося завантажити список станцій');
      } finally {
        setLoading(false);
      }
    }
    fetchStations();
  }, []);

  if (loading) return <p>Завантаження станцій...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="station-container">
      <label htmlFor="station">Оберіть станцію: </label>
      <select id="station" onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Оберіть станцію --</option>
        {stations.map((station) => (
          <option key={station._id} value={station._id}>
            {station.name} ({station.city})
          </option>
        ))}
      </select>
    </div>
  );
};

export default StationSelector;
