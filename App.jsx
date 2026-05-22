import React, { useState } from "react";
import jsPDF from "jspdf";

import logo from "../logo.png";

import { products } from "./products";
import { getZone, getShipping } from "./transport";

export default function App() {

  const [postalCode, setPostalCode] = useState("");

  const [ref1, setRef1] = useState(products[0]?.ref || "");
  const [ref2, setRef2] = useState(products[0]?.ref || "");
  const [ref3, setRef3] = useState(products[0]?.ref || "");
  const [ref4, setRef4] = useState(products[0]?.ref || "");

  const [sqm1, setSqm1] = useState("");
  const [sqm2, setSqm2] = useState("");
  const [sqm3, setSqm3] = useState("");
  const [sqm4, setSqm4] = useState("");

  const p1 = products.find((p) => p.ref === ref1) || {};
  const p2 = products.find((p) => p.ref === ref2) || {};
  const p3 = products.find((p) => p.ref === ref3) || {};
  const p4 = products.find((p) => p.ref === ref4) || {};

  const calcBoxes = (sqm, sqmBox) => {
    if (!sqm || !sqmBox) return 0;
    return Math.ceil(Number(sqm) / sqmBox);
  };

  const boxes1 = calcBoxes(sqm1, p1.sqmBox);
  const boxes2 = calcBoxes(sqm2, p2.sqmBox);
  const boxes3 = calcBoxes(sqm3, p3.sqmBox);
  const boxes4 = calcBoxes(sqm4, p4.sqmBox);

  const totalBoxes =
    boxes1 +
    boxes2 +
    boxes3 +
    boxes4;

  const totalWeightProducts =
    boxes1 * (p1.kgBox || 0) +
    boxes2 * (p2.kgBox || 0) +
    boxes3 * (p3.kgBox || 0) +
    boxes4 * (p4.kgBox || 0);

  const palletWeight =
    totalWeightProducts > 0 ? 18 : 0;

  const totalWeight =
    totalWeightProducts + palletWeight;

  const realTotalSqm =
    boxes1 * (p1.sqmBox || 0) +
    boxes2 * (p2.sqmBox || 0) +
    boxes3 * (p3.sqmBox || 0) +
    boxes4 * (p4.sqmBox || 0);

  const zone = getZone(postalCode);

  const baseShipping =
    getShipping(zone, totalWeight);

  const shippingPrice =
    baseShipping > 0
      ? (baseShipping * 1.03).toFixed(2)
      : "0.00";

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Calculadora de Portes DUNE",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Código Postal: ${postalCode}`,
      20,
      45
    );

    doc.text(
      `Zona: ${zone || "-"}`,
      20,
      55
    );

    doc.text(
      `Peso Total: ${totalWeight.toFixed(2)} kg`,
      20,
      75
    );

    doc.text(
      `Caixas Totais: ${totalBoxes}`,
      20,
      85
    );

    doc.text(
      `m2 reais finais: ${realTotalSqm.toFixed(2)} m²`,
      20,
      95
    );

    doc.setFontSize(18);

    doc.text(
      `Valor Transporte: ${shippingPrice} €`,
      20,
      120
    );

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

      <label className="block text-xl font-bold mb-3">
        {title}
      </label>

      <select
        value={ref}
        onChange={(e) =>
          setRef(e.target.value)
        }
        className="w-full border rounded-xl p-4 mb-4"
      >

        {products.map((p) => (

          <option
            key={p.ref}
            value={p.ref}
          >
            {p.ref}
          </option>

        ))}

      </select>

      <label className="block font-semibold mb-2">
        Quantidade:
      </label>

      <input
        type="number"
        value={sqm}
        onChange={(e) =>
          setSqm(e.target.value)
        }
        placeholder="Ex: 12"
        className="w-full border rounded-xl p-4"
      />

      <div className="mt-4 text-lg">

        <strong>
          Caixas necessárias:
        </strong>{" "}
        {boxes}

      </div>

    </div>

  );

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-6 mb-10">

          <img
            src={logo}
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
            onChange={(e) =>
              setPostalCode(e.target.value)
            }
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
                <strong>
                  Caixas necessárias :
                </strong>{" "}
                {totalBoxes}
              </div>

              <div>
                <strong>
                  m2 reais finais :
                </strong>{" "}
                {realTotalSqm.toFixed(2)} m²
              </div>

              <div>
                <strong>
                  kg estimados :
                </strong>{" "}
                {totalWeight.toFixed(2)} kg
              </div>

            </div>

          </div>

          <div className="bg-black text-white rounded-3xl shadow-xl p-8">

            <h2 className="text-4xl font-bold mb-8">
              Resultado Transporte
            </h2>

            <div className="space-y-5 text-xl">

              <div>
                <strong>
                  Peso Total :
                </strong>{" "}
                {totalWeight.toFixed(2)} kg
              </div>

              <div>
                <strong>
                  Zona :
                </strong>{" "}
                {zone || "-"}
              </div>

              <div>
                <strong>
                  Valor :
                </strong>{" "}
                {shippingPrice} €
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
