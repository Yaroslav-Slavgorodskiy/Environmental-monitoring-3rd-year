const express = require('express');
const router = express.Router();
const Station = require('../models/station');
const { validateCreateStation, validateUpdateStation } = require('../validations/stationValidation');


// Отримати всі станції
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Отримати одну станцію за ID
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Створити нову станцію (з валідацією)
router.post('/', validateCreateStation, async (req, res) => {
  const station = new Station({
    name: req.body.name,
    city: req.body.city,
    coordinates: req.body.coordinates,
    contact: req.body.contact,
    measurements: req.body.measurements
  });
  try {
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Оновити станцію за ID (з валідацією)
router.put('/:id', validateUpdateStation, async (req, res) => {
  try {
    const updated = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Station not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Видалити всі станції (має стояти ПЕРЕД видаленням за id)
router.delete('/', async (req, res) => {
  try {
    const result = await Station.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} stations` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Видалити станцію за ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Station.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Station deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;