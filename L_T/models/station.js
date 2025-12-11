const mongoose = require('mongoose');

// Опис схеми станції
const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  contact: {
    email: String,
    phone: String
  },
  measurements: [String]  
});

// Створення моделі за схемою 
const Station = mongoose.model('Station', stationSchema);
module.exports = Station;