const LIMITS = {
  pm25: { min: 5, max: 150 },
  pm10: { min: 10, max: 300 },
  no2:  { min: 10, max: 400 },
  so2:  { min: 5, max: 200 },
  o3:   { min: 10, max: 250 }
};

function isValidNumber(value) {
  return value !== undefined && value !== null && !isNaN(value);
}

function safeDivide(value, limitMax) {
  if (!isValidNumber(value) || !isValidNumber(limitMax) || limitMax === 0) {
    return 0; 
  }
  return 100 * value / limitMax;
}

function computeAirIndex(data = {}) {
  const sub = {
    pm25: safeDivide(data.pm25, LIMITS.pm25.max),
    pm10: safeDivide(data.pm10, LIMITS.pm10.max),
    no2:  safeDivide(data.no2,  LIMITS.no2.max),
    so2:  safeDivide(data.so2,  LIMITS.so2.max),
    o3:   safeDivide(data.o3,   LIMITS.o3.max)
  };

  const I = Math.max(...Object.values(sub));

  return {
    subIndices: sub,
    I: Number(I.toFixed(2))
  };
}

module.exports = computeAirIndex;