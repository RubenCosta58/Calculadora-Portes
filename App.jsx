import React, { useState } from 'react';

export default function App() {
  const transportTable = {
    1: [
      { maxKg: 30, price: 13.26 },
      { maxKg: 50, price: 15.86 },
      { maxKg: 70, price: 18.27 },
      { maxKg: 100, price: 21.9 },
      { maxKg: 150, price: 28.47 },
      { maxKg: 200, price: 35.04 },
      { maxKg: 250, price: 42.21 },
      { maxKg: 300, price: 49.4 },
      { maxKg: 350, price: 57.35 },
      { maxKg: 400, price: 65.32 },
      { maxKg: 450, price: 73.26 },
      { maxKg: 500, price: 81.23 },
    ],
    2: [
      { maxKg: 30, price: 20.94 },
      { maxKg: 50, price: 23.39 },
      { maxKg: 70, price: 25.78 },
      { maxKg: 100, price: 29.39 },
      { maxKg: 150, price: 36.37 },
      { maxKg: 200, price: 43.36 },
      { maxKg: 250, price: 51.57 },
      { maxKg: 300, price: 59.77 },
      { maxKg: 350, price: 69.27 },
      { maxKg: 400, price: 78.76 },
      { maxKg: 450, price: 88.24 },
      { maxKg: 500, price: 97.75 },
    ],
    3: [
      { maxKg: 30, price: 23.28 },
      { maxKg: 50, price: 25.76 },
      { maxKg: 70, price: 28.21 },
      { maxKg: 100, price: 32.53 },
      { maxKg: 150, price: 39.74 },
      { maxKg: 200, price: 46.95 },
      { maxKg: 250, price: 58.41 },
      { maxKg: 300, price: 69.87 },
      { maxKg: 350, price: 80.27 },
      { maxKg: 400, price: 90.67 },
      { maxKg: 450, price: 101.06 },
      { maxKg: 500, price: 111.44 },
    ],
    4: [
      { maxKg: 30, price: 22.56 },
      { maxKg: 50, price: 28.0 },
      { maxKg: 70, price: 34.48 },
      { maxKg: 100, price: 38.95 },
      { maxKg: 150, price: 49.65 },
      { maxKg: 200, price: 60.34 },
      { maxKg: 250, price: 71.62 },
      { maxKg: 300, price: 82.88 },
      { maxKg: 350, price: 95.25 },
      { maxKg: 400, price: 107.61 },
      { maxKg: 450, price: 119.96 },
      { maxKg: 500, price: 132.29 },
    ],
    5: [
      { maxKg: 30, price: 73.48 },
      { maxKg: 50, price: 76.1 },
      { maxKg: 70, price: 78.52 },
      { maxKg: 100, price: 82.14 },
      { maxKg: 150, price: 96.15 },
      { maxKg: 200, price: 110.18 },
      { maxKg: 250, price: 136.13 },
      { maxKg: 300, price: 162.1 },
      { maxKg: 350, price: 188.85 },
      { maxKg: 400, price: 215.59 },
      { maxKg: 450, price: 242.34 },
      { maxKg: 500, price: 269.06 },
    ],
    6: [
      { maxKg: 30, price: 52.69 },
      { maxKg: 50, price: 55.3 },
      { maxKg: 70, price: 58.58 },
      { maxKg: 100, price: 72.29 },
      { maxKg: 150, price: 100.92 },
      { maxKg: 200, price: 129.55 },
      { maxKg: 250, price: 160.38 },
      { maxKg: 300, price: 191.19 },
      { maxKg: 350, price: 222.78 },
      { maxKg: 400, price: 254.37 },
      { maxKg: 450, price: 285.96 },
      { maxKg: 500, price: 317.54 },
    ],
  };

  const postalZones = [
    { start: 1000, end: 1999, zone: 1 },
    { start: 2000, end: 2999, zone: 2 },
    { start: 3000, end: 3999, zone: 3 },
    { start: 4000, end: 4999, zone: 4 },
    { start: 5000, end: 9999, zone: 5 },
  ];

  const products = [
    {
      ref: 'Alfar 6,5x20',
      sqmBox: 0.624,
      kgBox: 8.64,
      palletKg: 898.56,
      realSqm: 0.65,
    },
    {
      ref: 'Altea 7,5x30',
      sqmBox: 0.4949,
      kgBox: 7.92,
      palletKg: 990,
      realSqm: 0.52,
    },
    {
      ref: 'Metro 10x20',
      sqmBox: 0.8,
      kgBox: 10.4,
      palletKg: 998.4,
      realSqm: 0.84,
    },
    {
      ref: 'Meknes 6,2x25',
      sqmBox: 0.5579,
      kgBox: 8.1,
      palletKg: 874.8,
      realSqm: 0.58,
    },
    {
      ref: 'Tabarca 7,5x23',
      sqmBox: 0.4829,
      kgBox: 7,
      palletKg: 840,
      realSqm: 0.50,
    },
    {
      ref: 'Antiga 6,9x24',
      sqmBox: 0.7451,
      kgBox: 10.8,
      palletKg: 1036.8,
      realSqm: 0.76,
    },
    {
      ref: 'Atlantique 6,9x24',
      sqmBox: 0.7451,
      kgBox: 10.71,
      palletKg: 1028.16,
      realSqm: 0.76,
    },
    {
      ref: 'Fragmenta 20x20',
      sqmBox: 0.68,
      kgBox: 13.19,
      palletKg: 1266.24,
      realSqm: 0.70,
    },
    {
      ref: 'Milano 6,9x24',
      sqmBox: 0.7451,
      kgBox: 10.62,
      palletKg: 1019.52,
      realSqm: 0.76,
    },
    {
      ref: 'Renania 6,5x20',
      sqmBox: 0.624,
      kgBox: 8.64,
      palletKg: 898.56,
      realSqm: 0.65,
    },
  ];

  const [selectedProduct1, setSelectedProduct1] = useState(products[0].ref);
  const [selectedProduct2, setSelectedProduct2] = useState(products[0].ref);
  const [selectedProduct3, setSelectedProduct3] = useState(products[0].ref);
  const [selectedProduct4, setSelectedProduct4] = useState(products[0].ref);
  const [sqm, setSqm] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const product = products.find((p) => p.ref === selectedProduct1);

  const boxes = sqm
    ? Math.ceil(parseFloat(sqm) / product.realSqm)
    : 0;

  const totalWeight = boxes * product.kgBox;

  const realTotalSqm = (boxes * product.realSqm).toFixed(2);

  const postalPrefix = parseInt(postalCode?.split('-')[0]);

  const zone = postalZones.find(
    (z) => postalPrefix >= z.start && postalPrefix <= z.end
  )?.zone;

  const shippingPrice = zone
    ? transportTable[zone]?.find((t) => totalWeight <= t.maxKg)?.price ||
      'Consultar'
    : '-';

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-8 flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-40 object-contain mb-2"
          />

          <div>
            <h1 className="text-4xl font-bold mb-2">
              Calculadora de Portes DUNE
            </h1>
            
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12 max-w-2xl">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Referência 1 :
            </label>
            <select
              className="w-full border rounded-2xl p-3"
              value={selectedProduct1}
              onChange={(e) => setSelectedProduct1(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.ref}>{p.ref}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Quantidade:
            </label>
            <input
              type="number"
              className="w-full border rounded-2xl p-3"
              value={sqm}
              onChange={(e) => setSqm(e.target.value)}
              placeholder="Ex: 32"
            />
          </div>

          <div>
            <label className="block text-xl font-bold mt-6 mb-2">
              CÓDIGO POSTAL
            </label>
            <input
              type="text"
              className="w-full border rounded-2xl p-3"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="2750-440"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Referência 2 :
            </label>
            <select
              className="w-full border rounded-2xl p-3"
              value={selectedProduct2}
              onChange={(e) => setSelectedProduct2(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.ref}>{p.ref}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Referência 3 :
            </label>
            <select
              className="w-full border rounded-2xl p-3"
              value={selectedProduct3}
              onChange={(e) => setSelectedProduct3(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.ref}>{p.ref}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Referência 4 :
            </label>
            <select
              className="w-full border rounded-2xl p-3"
              value={selectedProduct4}
              onChange={(e) => setSelectedProduct4(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.ref}>{p.ref}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-3xl font-bold mb-6">
              Dados do Produto
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-1 gap-10">
                <span>m2 / caixa -</span>
                <strong>{product.sqmBox}</strong>
              </div>

              <div className="flex justify-between items-center py-1 gap-10">
                <span>kg / caixa -</span>
                <strong>{product.kgBox} kg</strong>
              </div>

              <div className="flex justify-between items-center py-1 gap-10">
                <span>Caixas necessárias -</span>
                <strong>{boxes}</strong>
              </div>

              <div className="flex justify-between items-center py-1 gap-10">
                <span>m2 reais finais -</span>
                <strong>{realTotalSqm} m²</strong>
              </div>
            </div>
          </div>

          <div className="bg-black text-white rounded-2xl p-6">
            <h2 className="text-3xl font-bold mb-6">
              Resultado Transporte
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-1 gap-10">
                <span>Peso Total -</span>
                <strong>{totalWeight.toFixed(2)} kg</strong>
              </div>

              <div className="flex justify-between items-center py-1 gap-10">
                <span>Zona -</span>
                <strong>{zone || '-'}</strong>
              </div>

              <div className="flex justify-between items-center text-2xl mt-6">
                <span>Valor -</span>
                <strong>
                  {typeof shippingPrice === 'number'
                    ? `${shippingPrice.toFixed(2)} €`
                    : shippingPrice}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
