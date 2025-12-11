const Joi = require('joi');

const createAirQualitySchema = Joi.object({
  pm25: Joi.number().min(0).max(1000).required(),
  pm10: Joi.number().min(0).max(1000).required(),
  co2: Joi.number().min(0).max(5000).required(),
  o3: Joi.number().min(0).max(500).required(),
  no2: Joi.number().min(0).max(500).required(),
  temperature: Joi.number().min(-50).max(60).required(),
  humidity: Joi.number().min(0).max(100).required()
});

const updateAirQualitySchema = Joi.object({
  pm25: Joi.number().min(0).max(1000),
  pm10: Joi.number().min(0).max(1000),
  co2: Joi.number().min(0).max(5000),
  o3: Joi.number().min(0).max(500),
  no2: Joi.number().min(0).max(500),
  temperature: Joi.number().min(-50).max(60),
  humidity: Joi.number().min(0).max(100)
  
}).min(1);

// Middleware для створення
function validateCreateAirQuality(req, res, next) {
  const { error } = createAirQualitySchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map(d => d.message).join('; ');
    return res.status(400).json({ message });
  }
  next();
}
// Для оновдлення
function validateUpdateAirQuality(req, res, next) {
  const { error } = updateAirQualitySchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map(d => d.message).join('; ');
    return res.status(400).json({ message });
  }
  next();
}

module.exports = {
  validateCreateAirQuality,
  validateUpdateAirQuality
};