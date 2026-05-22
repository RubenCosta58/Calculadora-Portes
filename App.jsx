import React, { useMemo, useState } from "react";
import jsPDF from "jspdf";

const products = [
  {
    ref: "Alfar 6,5x20",
    sqmBox: 0.624,
    kgBox: 8.64,
  },
  {
    ref: "Milano 6,9x24",
    sqmBox: 0.5,
    kgBox: 9.2,
  },
  {
    ref: "Meknes 6,2x25",
    sqmBox: 0.62,
    kgBox: 8.8,
  },
  {
    ref: "Atlantique 20x20",
    sqmBox: 1,
    kgBox: 18,
  },
  {
    ref: "Fragmenta 20x20",
    sqmBox: 1,
    kgBox: 17.5,
  },
];

const transportRates = {
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

function getZone(postalCode) {
  const prefix = parseInt(postalCode?.split("-")[0] || 0);

  if (prefix >= 1000 && prefix <= 1999) return 1;
  if (prefix >= 2000 && prefix <= 2999) return 2;
  if (prefix >= 3000 && prefix <= 3999) return 3;
  if (prefix >= 4000 && prefix <= 4999) return 4;
  if (prefix >= 5000 && prefix <= 7999) return 5;
  if (prefix >= 8000 && prefix <= 9999) return 6;

  return null;
}

function getShipping(zone, weight) {
  if (!zone || !weight) return 0;

  const table = transportRates[zone];

  for (const row of table) {
    if (weight <= row.max) {
      return row.price;
    }
  }

  return table[table.length - 1].price;
}

export default function App() {
  const [postalCode, setPostalCode] = useState("");

  const [ref1, setRef1] = useState(products[0].ref);
  const [ref2, setRef2] = useState(products[0].ref);
  const [ref3, setRef3] = useState(products[0].ref);
  const [ref4, setRef4] = useState(products[0].ref);

  const [sqm1, setSqm1] = useState("");
  const [sqm2, setSqm2] = useState("");
  const [sqm3, setSqm3] = useState("");
  const [sqm4, setSqm4] = useState("");

  const p1 = products.find((p) => p.ref === ref1);
  const p2 = products.find((p) => p.ref === ref2);
  const p3 = products.find((p) => p.ref === ref3);
  const p4 = products.find((p) => p.ref === ref4);

  const calcBoxes = (sqm, sqmBox) => {
    if (!sqm || !sqmBox) return 0;
    return Math.ceil(Number(sqm) / sqmBox);
  };

  const boxes1 = calcBoxes(sqm1, p1.sqmBox);
  const boxes2 = calcBoxes(sqm2, p2.sqmBox);
  const boxes3 = calcBoxes(sqm3, p3.sqmBox);
  const boxes4 = calcBoxes(sqm4, p4.sqmBox);

  const totalBoxes = boxes1 + boxes2 + boxes3 + boxes4;

  const totalWeightProducts =
    boxes1 * p1.kgBox +
    boxes2 * p2.kgBox +
    boxes3 * p3.kgBox +
    boxes4 * p4.kgBox;

  const palletCount =
    totalWeightProducts > 0
      ? Math.max(1, Math.ceil(totalWeightProducts / 1000))
      : 0;

  const totalWeight = totalWeightProducts + palletCount * 18;

  const realTotalSqm =
    boxes1 * p1.sqmBox +
    boxes2 * p2.sqmBox +
    boxes3 * p3.sqmBox +
    boxes4 * p4.sqmBox;

  const zone = getZone(postalCode);

  const baseShipping = getShipping(zone, totalWeight);

  const shippingPrice =
    baseShipping > 0 ? (baseShipping * 1.03).toFixed(2) : "0.00";

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Calculadora de Portes DUNE", 20, 20);

    doc.setFontSize(14);

    doc.text(`Código Postal: ${postalCode}`, 20, 45);
    doc.text(`Zona: ${zone || "-"}`, 20, 55);

    doc.text(`Peso Total: ${totalWeight.toFixed(2)} kg`, 20, 75);
    doc.text(`Caixas Totais: ${totalBoxes}`, 20, 85);
    doc.text(`m² reais finais: ${realTotalSqm.toFixed(2)} m²`, 20, 95);

    doc.setFontSize(18);
    doc.text(`Valor Transporte: ${shippingPrice} €`, 20, 120);

    doc.save("portes-dune.pdf");
  };

  const renderReference = (
    title,
    ref,
    setRef,
    sqm,
    setSqm,
    boxes
  ) => (
    <div className="bg-white rounded-2xl shadow p-6">
      <label className="block text-xl font-bold mb-3">{title}</label>

      <select
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4"
      >
        {products.map((p) => (
          <option key={p.ref}>{p.ref}</option>
        ))}
      </select>

      <label className="block font-semibold mb-2">Quantidade:</label>

      <input
        type="number"
        value={sqm}
        onChange={(e) => setSqm(e.target.value)}
        placeholder="Ex: 12"
        className="w-full border rounded-xl p-4"
      />

      <div className="mt-4 text-lg">
        <strong>Caixas necessárias:</strong> {boxes}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-6 mb-10">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-40 object-contain"
          />

          <h1 className="text-5xl font-bold">
            Calculadora de Portes DUNE
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {renderReference(
            "Referência 1",
            ref1,
            setRef1,
            sqm1,
            setSqm1,
            boxes1
          )}

          {renderReference(
            "Referência 2",
            ref2,
            setRef2,
            sqm2,
            setSqm2,
            boxes2
          )}

          {renderReference(
            "Referência 3",
            ref3,
            setRef3,
            sqm3,
            setSqm3,
            boxes3
          )}

          {renderReference(
            "Referência 4",
            ref4,
            setRef4,
            sqm4,
            setSqm4,
            boxes4
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
          <div className="text-3xl font-bold mb-4">
            CÓDIGO POSTAL:
          </div>

          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="2750-440"
            className="w-full border rounded-2xl p-6 text-5xl font-bold"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-4xl font-bold mb-8">
              Dados do Produto
            </h2>

            <div className="space-y-5 text-xl">
              <div>
                <strong>m2 / caixa :</strong> {p1.sqmBox}
              </div>

              <div>
                <strong>kg / caixa :</strong> {p1.kgBox} kg
              </div>

              <div>
                <strong>Caixas necessárias :</strong> {totalBoxes}
              </div>

              <div>
                <strong>m2 reais finais :</strong>{" "}
                {realTotalSqm.toFixed(2)} m²
              </div>
            </div>
          </div>

          <div className="bg-black text-white rounded-3xl shadow-xl p-8">
            <h2 className="text-4xl font-bold mb-8">
              Resultado Transporte
            </h2>

            <div className="space-y-5 text-xl">
              <div>
                <strong>Peso Total :</strong>{" "}
                {totalWeight.toFixed(2)} kg
              </div>

              <div>
                <strong>Zona :</strong> {zone || "-"}
              </div>

              <div>
                <strong>Valor :</strong> {shippingPrice} €
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={exportPDF}
          className="mt-10 bg-black text-white px-8 py-5 rounded-2xl text-xl font-bold hover:opacity-90"
        >
          Exportar PDF
        </button>

      </div>
    </div>
  );
}
