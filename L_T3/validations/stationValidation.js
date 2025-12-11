const Joi = require('joi');

const allowedMeasurements = ['pm2.5', 'pm10', 'co2', 'o3', 'no2', 'temperature', 'humidity']; // перелік допустимих параметрів

// Схема для створення станції (POST)
const createStationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  city: Joi.string().min(1).required(),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lon: Joi.number().min(-180).max(180).required()
  }).required(),
  contact: Joi.object({
    email: Joi.string().email().allow('', null),
    phone: Joi.string().allow('', null)
  }).optional(),
  measurements: Joi.array().items(Joi.string().valid(...allowedMeasurements)).optional()
});

// Схема для оновлення станції (PUT) — хоча б одне поле повинно бути
const updateStationSchema = Joi.object({
  name: Joi.string().min(3),
  city: Joi.string().min(1),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lon: Joi.number().min(-180).max(180).required()
  }),
  contact: Joi.object({
    email: Joi.string().email().allow('', null),
    phone: Joi.string().allow('', null)
  }),
  measurements: Joi.array().items(Joi.string().valid(...allowedMeasurements))
}).min(1); 

// Middleware для валідації запиту на створення
function validateCreateStation(req, res, next) {
  const { error } = createStationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map(d => d.message).join('; ');
    return res.status(400).json({ message });
  }
  next();
}

// Middleware для валідації запиту на оновлення
function validateUpdateStation(req, res, next) {
  const { error } = updateStationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map(d => d.message).join('; ');
    return res.status(400).json({ message });
  }
  next();
}

module.exports = {
  validateCreateStation,
  validateUpdateStation
};