const API_URL = 'http://localhost:5000'; 

export async function getStations() {
  const response = await fetch(`${API_URL}/stations`);
  if (!response.ok) throw new Error('Не вдалося завантажити станції');
  return await response.json();
}

export async function getAirQuality() {
  const response = await fetch(`${API_URL}/airquality`);
  if (!response.ok) throw new Error('Не вдалося завантажити дані якості повітря');
  return await response.json();
}

export async function getAirQualityByStation(stationId) {
  const response = await fetch(`${API_URL}/airquality/station/${stationId}`);
  if (!response.ok) throw new Error('Не вдалося завантажити дані для станції');
  return await response.json();
}