const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true }, // посилання на станцію
  pm25: Number,   
  pm10: Number,   
  co2: Number,    
  o3: Number,     
  no2: Number,    
  temperature: Number,
  humidity: Number,
  
});

const AirQuality = mongoose.model('AirQuality', airQualitySchema);
module.exports = AirQuality;



// createdAt: { type: Date, default: Date.now } // час вимірювання