import React, { useState } from "react";
import jsPDF from "jspdf";

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

    doc.text(
      `Código Postal: ${postalCode}`,
      20,
      40
    );

    doc.text(
      `Zona: ${zone || "-"}`,
      20,
      50
    );

    doc.text(
      `Peso Total: ${totalWeight.toFixed(2)} kg`,
      20,
      60
    );

    doc.text(
      `Valor Transporte: ${shippingPrice} €`,
      20,
      70
    );

    doc.save("portes-dune.pdf");
  };

  const renderCard = (
    title,
    ref,
    setRef,
    sqm,
    setSqm,
    boxes
  ) => (

    <div className="bg-white rounded-3xl shadow-md p-7">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      <select
        value={ref}
        onChange={(e) =>
          setRef(e.target.value)
        }
        className="w-full border rounded-2xl p-4 mb-6 text-lg"
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

      <div className="font-bold text-xl mb-3">
        Quantidade:
      </div>

      <input
        type="number"
        value={sqm}
        onChange={(e) =>
          setSqm(e.target.value)
        }
        placeholder="Ex: 12"
        className="w-full border rounded-2xl p-4 text-lg"
      />

      <div className="mt-6 text-xl">

        <strong>
          Caixas necessárias:
        </strong>{" "}
        {boxes}

      </div>

    </div>

  );

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* LOGO CENTRADO */}

        <div className="flex justify-center mb-10">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-auto"
          />

        </div>

        {/* REFERÊNCIAS */}

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {renderCard(
            "Referência 1",
            ref1,
            setRef1,
            sqm1,
            setSqm1,
            boxes1
          )}

          {renderCard(
            "Referência 2",
            ref2,
            setRef2,
            sqm2,
            setSqm2,
            boxes2
          )}

          {renderCard(
            "Referência 3",
            ref3,
            setRef3,
            sqm3,
            setSqm3,
            boxes3
          )}

          {renderCard(
            "Referência 4",
            ref4,
            setRef4,
            sqm4,
            setSqm4,
            boxes4
          )}

        </div>

        {/* CÓDIGO POSTAL */}

        <div className="flex justify-center mb-14">

          <div className="bg-black rounded-3xl p-6 w-[420px]">

            <div className="text-white text-3xl font-bold text-center mb-5">
              CÓDIGO POSTAL
            </div>

            <input
              type="text"
              value={postalCode}
              onChange={(e) =>
                setPostalCode(e.target.value)
              }
              placeholder="2750-440"
              className="w-full rounded-2xl p-4 text-center text-3xl font-bold"
            />

          </div>

        </div>

        {/* RESULTADOS */}

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-4xl font-bold mb-8">
              Dados do Produto
            </h2>

            <div className="space-y-6 text-2xl">

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

          <div className="bg-black text-white rounded-3xl shadow-md p-8">

            <h2 className="text-4xl font-bold mb-8">
              Resultado Transporte
            </h2>

            <div className="space-y-6 text-2xl">

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
          className="mt-10 bg-black text-white px-10 py-5 rounded-2xl text-2xl font-bold"
        >
          Exportar PDF
        </button>

      </div>

    </div>
  );
}
