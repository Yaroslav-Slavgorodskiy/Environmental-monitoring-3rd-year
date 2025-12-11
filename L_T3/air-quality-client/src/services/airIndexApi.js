const API_URL = 'http://localhost:5000';

export async function calcAirIndex(payload) {
  const response = await fetch(`${API_URL}/airindex/calc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error("Помилка під час розрахунку індексу");

  return await response.json();
}