const mongoose = require('mongoose');

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

//Інекс: Пошук станції за назвою 
stationSchema.index({ name: 1 });

//Інекс: Пошук або фільтрація за містом
stationSchema.index({ city: 1 });

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;