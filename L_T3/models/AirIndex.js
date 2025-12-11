const mongoose = require('mongoose');

const airIndexSchema = new mongoose.Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },

  pm25: { type: Number, required: true },
  pm10: { type: Number, required: true },
  no2:  { type: Number, required: true },
  so2:  { type: Number, required: true },
  o3:   { type: Number, required: true },

  subIndices: {
    pm25: Number,
    pm10: Number,
    no2: Number,
    so2: Number,
    o3: Number
  },

  I: Number,

  datetime: { type: Date, default: Date.now }
});

airIndexSchema.index({ stationId: 1, datetime: -1 });
airIndexSchema.index({ datetime: -1 });

module.exports = mongoose.model('AirIndex', airIndexSchema);