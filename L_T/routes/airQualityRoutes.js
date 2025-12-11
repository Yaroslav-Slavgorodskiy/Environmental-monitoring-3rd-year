const express = require('express');
const router = express.Router();
const AirQuality = require('../models/airQuality');
const { validateCreateAirQuality, validateUpdateAirQuality } = require('../validations/airQualityValidation');

router.get('/', async (req, res) => {
  try {
    const data = await AirQuality.find().populate('station'); // підтягнути дані станції
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Отримати запис за ID
router.get('/:id', async (req, res) => {
  try {
    const record = await AirQuality.findById(req.params.id).populate('station');
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 router.post('/:stationId', validateCreateAirQuality, async (req, res) => {
  const record = new AirQuality({
    station: req.params.stationId,
    pm25: req.body.pm25,
    pm10: req.body.pm10,
    co2: req.body.co2,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    o3: req.body.o3,
    no2: req.body.no2
  });
  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Оновити запис
router.put('/:id', validateUpdateAirQuality, async (req, res) => {
  try {
    const updated = await AirQuality.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Видалити запис
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await AirQuality.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Видалити всі записи
router.delete('/', async (req, res) => {
  try {
    const result = await AirQuality.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} records` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;