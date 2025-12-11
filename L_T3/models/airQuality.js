const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true }, 
  pm25: Number,   
  pm10: Number,   
  co2: Number,    
  o3: Number,     
  no2: Number,    
  temperature: Number,
  humidity: Number,
  
});

// Індеккс: Пошук станції за назвою або для фільтраціі
airQualitySchema.index({ station: 1 });

//Індекс: Для швидкого отримання останнього запису (сортування по часу через _id)
airQualitySchema.index({ station: 1, _id: -1 });

const AirQuality = mongoose.model('AirQuality', airQualitySchema);
module.exports = AirQuality;



// createdAt: { type: Date, default: Date.now } // час вимірювання