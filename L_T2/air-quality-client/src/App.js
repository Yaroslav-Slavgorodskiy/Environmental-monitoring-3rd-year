import React, { useState } from 'react';
import StationSelector from './components/StationSelector';
import AirQualityDisplay from './components/AirQualityDisplay';
import './App.css';

function App() {
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div className="app-container">
      <h1 className="app-title">Система моніторингу якості повітря</h1>

      <StationSelector onSelect={setSelectedStation} />
      <AirQualityDisplay stationId={selectedStation} />
    </div>
  );
}

export default App;
