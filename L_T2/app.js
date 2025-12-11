const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./Database');
const stationRoutes = require('./routes/stationRoutes');
const airQualityRoutes = require('./routes/airQualityRoutes');

const app = express();
//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 5000;

// Парсинг тіла запиту JSON
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Підключення до MongoDB
connectDB();

// Маршрути
app.use('/stations', stationRoutes);
app.use('/airquality', airQualityRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});