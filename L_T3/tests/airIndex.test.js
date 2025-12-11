const computeAirIndex = require("../calculations/computeAirIndex");

describe("computeAirIndex (formula: I = max_i(100 * Ci / Limit_i))", () => {

  // 1) Перевірка субіндексів при значеннях, що дорівнюють лімітам
  test("Субіндекси правильно обчислюються при лімітних значеннях", () => {
    const data = { 
      pm25: 150,   
      pm10: 300,   
      no2: 400,    
      so2: 200,    
      o3: 250      
    };

    const result = computeAirIndex(data);

    expect(result.subIndices.pm25).toBe(100);
    expect(result.subIndices.pm10).toBe(100);
    expect(result.subIndices.no2).toBe(100);
    expect(result.subIndices.so2).toBe(100);
    expect(result.subIndices.o3).toBe(100);

    expect(result.I).toBe(100);
  });

  // 2) Перевірка I = MAX(sub-indexes)
  test("Загальний індекс має дорівнювати максимуму субіндексів", () => {
    const data = {
      pm25: 75,    // 100 * 75/150 = 50
      pm10: 150,   // 100 * 150/300 = 50
      no2: 200,    // 100 * 200/400 = 50
      so2: 100,    // 100 * 100/200 = 50
      o3:  125     // 100 * 125/250 = 50
    };

    const result = computeAirIndex(data);

    const expectedSub = [50, 50, 50, 50, 50];
    const expectedMax = Math.max(...expectedSub);

    expect(result.I).toBe(expectedMax);
  });

  // 3) Перевірка мінімальних і максимальних значень
  test("Перевірка граничних значень (0 та максимуми)", () => {
    const data = {
      pm25: 0,     
      pm10: 300,   
      no2: 0,      
      so2: 200,    
      o3: 0        
    };

    const result = computeAirIndex(data);

    expect(result.subIndices.pm25).toBe(0);
    expect(result.subIndices.pm10).toBe(100);
    expect(result.subIndices.no2).toBe(0);
    expect(result.subIndices.so2).toBe(100);
    expect(result.subIndices.o3).toBe(0);

    expect(result.I).toBe(100);
  });

});
