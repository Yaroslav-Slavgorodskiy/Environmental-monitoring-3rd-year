import React from "react";

function getColor(I) {
  if (I <= 50) return "green";        // добре
  if (I <= 100) return "yellow";       // помірно
  if (I <= 150) return "orange";      // погано
  return "red";                       // дуже погано 
}

const AirIndexResult = ({ result }) => {
  if (!result) return null;

  const color = getColor(result.I);

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
      background: "#fafafa"
    }}>
      <h3>Результат розрахунку</h3>

      <p><b>Загальний індекс:</b> 
        <span style={{ color, fontWeight: "bold" }}> {result.I.toFixed(2)}</span>
      </p>

      <h4>Суб-індекси</h4>
      <ul>
        <li>PM2.5: {result.subIndices.pm25.toFixed(2)}</li>
        <li>PM10: {result.subIndices.pm10.toFixed(2)}</li>
        <li>NO₂: {result.subIndices.no2.toFixed(2)}</li>
        <li>SO₂: {result.subIndices.so2.toFixed(2)}</li>
        <li>O₃:  {result.subIndices.o3.toFixed(2)}</li>
      </ul>
    </div>
  );
};

export default AirIndexResult;