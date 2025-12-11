import React, { useState } from 'react';
import StationSelector from './components/StationSelector';
import AirQualityDisplay from './components/AirQualityDisplay';
import AirIndexForm from './components/AirIndexForm';
import AirIndexResult from './components/AirIndexResult';
import { Toaster } from "react-hot-toast";   
import './App.css';

function App() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">

      <Toaster position="top-right" /> 

      <h1 className="app-title">Система моніторингу якості повітря</h1>

      <StationSelector onSelect={setSelectedStation} />
      <AirQualityDisplay stationId={selectedStation} />
      <AirIndexForm onResult={setResult} />
      <AirIndexResult result={result} />
    </div>
  );
}

export default App;
