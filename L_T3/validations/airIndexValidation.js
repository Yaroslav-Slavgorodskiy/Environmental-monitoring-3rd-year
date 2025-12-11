const Joi = require('joi');

const airIndexSchema = Joi.object({
  stationId: Joi.string().required(),

pm25: Joi.number().min(5).max(150).required(),
pm10: Joi.number().min(10).max(300).required(),
no2: Joi.number().min(10).max(400).required(),
so2: Joi.number().min(5).max(200).required(),
o3: Joi.number().min(10).max(250).required()
});

function validateAirIndex(req, res, next) {
  const { error } = airIndexSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map(d => d.message).join('; ');
    return res.status(400).json({ message });
  }
  next();
}

module.exports = { validateAirIndex };