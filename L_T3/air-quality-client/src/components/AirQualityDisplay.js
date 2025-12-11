import React, { useEffect, useState } from "react";
import { getAirQualityByStation } from "../services/api";
import "./AirQualityDisplay.css"; 

const AirQualityDisplay = ({ stationId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stationId) {
      setError(null);
      setData(null);
      getAirQualityByStation(stationId)
        .then(setData)
        .catch(() => setError("Не вдалося завантажити дані якості повітря."));
    }
  }, [stationId]);

  if (!stationId) return <p className="info-text">Оберіть станцію, щоб переглянути дані про якість повітря.</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!data) return <p className="info-text">Завантаження даних...</p>;

  return (
    <div className="airquality-container">
      <h3>Якість повітря на станції <span>"{data.station.name}"</span></h3>
      <table className="airquality-table">
        <thead>
          <tr>
            <th>Параметр</th>
            <th>Значення</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>PM2.5</td><td>{data.pm25}</td></tr>
          <tr><td>PM10</td><td>{data.pm10}</td></tr>
          <tr><td>CO₂</td><td>{data.co2}</td></tr>
          <tr><td>O₃</td><td>{data.o3}</td></tr>
          <tr><td>NO₂</td><td>{data.no2}</td></tr>
          <tr><td>Температура</td><td>{data.temperature} °C</td></tr>
          <tr><td>Вологість</td><td>{data.humidity} %</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default AirQualityDisplay;