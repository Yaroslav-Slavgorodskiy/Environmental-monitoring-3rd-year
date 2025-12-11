import React, { useState, useEffect } from "react";
import { getStations } from "../services/api";
import { calcAirIndex } from "../services/airIndexApi";
import toast from "react-hot-toast";
import "./AirIndexForm.css";

const LIMITS = {
  pm25: 150,
  pm10: 300,
  no2: 400,
  so2: 200,
  o3: 250
};

const AirIndexForm = ({ onResult }) => {
  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [form, setForm] = useState({
    stationId: "",
    pm25: "",
    pm10: "",
    no2: "",
    so2: "",
    o3: ""
  });

  useEffect(() => {
    getStations()
      .then(data => setStations(data))
      .catch(() => toast.error("Не вдалося завантажити станції"))
      .finally(() => setLoadingStations(false));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormLoading(true);

    const payload = {
      stationId: form.stationId,
      pm25: Number(form.pm25),
      pm10: Number(form.pm10),
      no2: Number(form.no2),
      so2: Number(form.so2),
      o3: Number(form.o3)
    };

    try {
      const result = await calcAirIndex(payload);
      onResult(result);
      toast.success("Розрахунок виконано!");
    } catch (err) {
      toast.error(err.message || "Помилка!");
    } finally {
      setFormLoading(false);
    }
  }

function randomInRange(min, max) {
  return (min + Math.random() * (max - min)).toFixed(1);
}

function generateRandom() {
  setForm({
    ...form,
    pm25: randomInRange(5, 150),
    pm10: randomInRange(10, 300),
    no2:  randomInRange(10, 400),
    so2:  randomInRange(5, 200),
    o3:   randomInRange(10, 250)
  });

  toast.success("Згенеровано валідні дані!");
}

  if (loadingStations) return <p>Завантаження станцій...</p>;

  return (
    <form onSubmit={handleSubmit} className="air-form">
      <h3>Розрахунок індексу якості повітря</h3>

      <label>Станція:</label>
      <select name="stationId" onChange={handleChange} required>
        <option value="">-- Оберіть станцію --</option>
        {stations.map(s => (
          <option key={s._id} value={s._id}>
            {s.name} ({s.city})
          </option>
        ))}
      </select>

      <label>PM2.5 (5–150):</label>
      <input type="number" name="pm25" value={form.pm25} onChange={handleChange} required />

      <label>PM10 (10–300):</label>
      <input type="number" name="pm10" value={form.pm10} onChange={handleChange} required />

      <label>NO₂ (10–400):</label>
      <input type="number" name="no2" value={form.no2} onChange={handleChange} required />

      <label>SO₂ (5–200):</label>
      <input type="number" name="so2" value={form.so2} onChange={handleChange} required />

      <label>O₃ (10–250):</label>
      <input type="number" name="o3" value={form.o3} onChange={handleChange} required />

      <button type="submit" disabled={formLoading}>
        {formLoading ? "Розрахунок..." : "Розрахувати"}
      </button>

      <button type="button" className="second" onClick={generateRandom}>
        Згенерувати значення
      </button>
    </form>
  );
};

export default AirIndexForm;