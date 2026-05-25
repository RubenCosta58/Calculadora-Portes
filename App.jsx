import React, { useState } from "react";
import jsPDF from "jspdf";

import { products } from "./products";
import { getZone, getShipping } from "./transport";

export default function App() {

  const [postalCode, setPostalCode] = useState("");

  const [ref1, setRef1] = useState("");
  const [ref2, setRef2] = useState("");
  const [ref3, setRef3] = useState("");
  const [ref4, setRef4] = useState("");

  const [sqm1, setSqm1] = useState("");
  const [sqm2, setSqm2] = useState("");
  const [sqm3, setSqm3] = useState("");
  const [sqm4, setSqm4] = useState("");

  const p1 = products.find((p) => p.ref === ref1) || {};
  const p2 = products.find((p) => p.ref === ref2) || {};
  const p3 = products.find((p) => p.ref === ref3) || {};
  const p4 = products.find((p) => p.ref === ref4) || {};

  const calcBoxes = (sqm, sqmBox) => {

    if (!sqm || !sqmBox) {
      return {
        boxes: 0,
        realSqm: 0
      };
    }

    const boxes =
      Math.ceil(Number(sqm) / sqmBox);

    const realSqm =
      boxes * sqmBox;

    return {
      boxes,
      realSqm
    };
  };

  const result1 =
    calcBoxes(sqm1, p1.sqmBox);

  const result2 =
    calcBoxes(sqm2, p2.sqmBox);

  const result3 =
    calcBoxes(sqm3, p3.sqmBox);

  const result4 =
    calcBoxes(sqm4, p4.sqmBox);

  const boxes1 = result1.boxes;
  const boxes2 = result2.boxes;
  const boxes3 = result3.boxes;
  const boxes4 = result4.boxes;

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
    result1.realSqm +
    result2.realSqm +
    result3.realSqm +
    result4.realSqm;

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
  ) => {

    const filteredProducts = products.filter((product) =>
      product.ref.toLowerCase().includes(ref.toLowerCase())
    );

    return (

      <div style={{ marginBottom: "20px" }}>

        <label
          style={{
            fontWeight: "bold",
            display: "block",
            marginBottom: "8px",
            fontSize: "18px"
          }}
        >
          {title}
        </label>

        <input
          type="text"
          value={ref}
          onChange={(e) =>
            setRef(e.target.value)
          }
          placeholder="Pesquisar referência..."
          style={{
            padding: "12px",
            width: "100%",
            marginBottom: "10px",
            borderRadius: "14px",
            border: "1px solid #d1d5db",
            fontSize: "16px"
          }}
        />

        {ref.length >= 2 && (

          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              maxHeight: "220px",
              overflowY: "auto"
            }}
          >

            {filteredProducts
              .slice(0, 12)
              .map((p) => (

              <div
                key={p.ref}
                onClick={() => setRef(p.ref)}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f1f1"
                }}
              >

                {p.ref}

              </div>

            ))}

          </div>

        )}

        <input
          type="number"
          value={sqm}
          onChange={(e) =>
            setSqm(e.target.value)
          }
          placeholder="Quantidade m²"
          style={{
            padding: "10px",
            width: "160px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "16px"
          }}
        />

        <div
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Caixas necessárias: {boxes}
        </div>

      </div>

    );
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-center mb-10">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-auto"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          <div className="bg-white rounded-3xl shadow-md p-7">

            {renderReference(
              "Referência 1",
              ref1,
              setRef1,
              sqm1,
              setSqm1,
              boxes1
            )}

          </div>

          <div className="bg-white rounded-3xl shadow-md p-7">

            {renderReference(
              "Referência 2",
              ref2,
              setRef2,
              sqm2,
              setSqm2,
              boxes2
            )}

          </div>

          <div className="bg-white rounded-3xl shadow-md p-7">

            {renderReference(
              "Referência 3",
              ref3,
              setRef3,
              sqm3,
              setSqm3,
              boxes3
            )}

          </div>

          <div className="bg-white rounded-3xl shadow-md p-7">

            {renderReference(
              "Referência 4",
              ref4,
              setRef4,
              sqm4,
              setSqm4,
              boxes4
            )}

          </div>

        </div>

        <div className="flex justify-center mb-14">

          <div className="bg-black rounded-3xl p-6 w-[420px]">

            <div className="text-white text-2xl font-bold text-center mb-5">
              CÓDIGO POSTAL
            </div>

            <input
              type="text"
              value={postalCode}
              onChange={(e) =>
                setPostalCode(e.target.value)
              }
              placeholder="2750-440"
              className="w-full rounded-2xl p-4 text-center text-2xl font-bold"
            />

          </div>

        </div>

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
