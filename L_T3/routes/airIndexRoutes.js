const express = require('express');
const router = express.Router();
const AirIndex = require('../models/AirIndex');
const computeAirIndex = require('../calculations/computeAirIndex');
const { validateAirIndex } = require('../validations/airIndexValidation');

router.post('/calc', validateAirIndex, (req, res) => {
  const result = computeAirIndex(req.body);
  res.json(result);
});

router.post('/save', validateAirIndex, async (req, res) => {
  try {
    const result = computeAirIndex(req.body);

    const newRecord = await AirIndex.create({
      ...req.body,
      subIndices: result.subIndices,
      I: result.I
    });

    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const data = await AirIndex.find().sort({ datetime: -1 });
  res.json(data);
});

 // Працює але не повнітю коректно
//router.get('/station/:id', async (req, res) => {
//  const history = await AirIndex.find({ stationId: req.params.id })
//                                .sort({ datetime: -1 });
//  res.json(history);
//});

router.get('/station/:id', async (req, res) => {
  const record = await AirIndex.findOne({ stationId: req.params.id })
                               .sort({ datetime: -1 })
                               .populate('stationId');

  if (!record) return res.status(404).json({ message: "Дані не знайдено" });

  res.json(record);
});

router.delete('/:id', async (req, res) => {
  const deleted = await AirIndex.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Записи не знайдено' });
  res.json({ message: 'Запис видалено' });
});

router.delete('/', async (req, res) => {
  const result = await AirIndex.deleteMany({});
  res.json({ message: `Deleted ${result.deletedCount} records` });
});

module.exports = router;