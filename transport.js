export const transportRates = {
  1: [
    { max: 100, price: 22 },
    { max: 200, price: 29 },
    { max: 300, price: 37 },
    { max: 500, price: 49 },
  ],

  2: [
    { max: 100, price: 24 },
    { max: 200, price: 33 },
    { max: 300, price: 42 },
    { max: 500, price: 58 },
  ],

  3: [
    { max: 100, price: 29 },
    { max: 200, price: 39 },
    { max: 300, price: 52 },
    { max: 500, price: 69 },
  ],

  4: [
    { max: 100, price: 35 },
    { max: 200, price: 48 },
    { max: 300, price: 62 },
    { max: 500, price: 82 },
  ],

  5: [
    { max: 100, price: 42 },
    { max: 200, price: 57 },
    { max: 300, price: 74 },
    { max: 500, price: 99 },
  ],

  6: [
    { max: 100, price: 49 },
    { max: 200, price: 68 },
    { max: 300, price: 88 },
    { max: 500, price: 119 },
  ],
};

export function getZone(postalCode) {
  const prefix = parseInt(postalCode?.split("-")[0] || 0);

  if (prefix >= 1000 && prefix <= 1999) return 1;
  if (prefix >= 2000 && prefix <= 2999) return 2;
  if (prefix >= 3000 && prefix <= 3999) return 3;
  if (prefix >= 4000 && prefix <= 4999) return 4;
  if (prefix >= 5000 && prefix <= 7999) return 5;
  if (prefix >= 8000 && prefix <= 9999) return 6;

  return null;
}

export function getShipping(zone, weight) {
  if (!zone || !weight) return 0;

  const table = transportRates[zone];

  for (const row of table) {
    if (weight <= row.max) {
      return row.price;
    }
  }

  return table[table.length - 1].price;
}
