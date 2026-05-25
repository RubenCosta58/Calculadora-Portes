import React, { useState } from "react";
import jsPDF from "jspdf";

import { products } from "./products";
import { getZone, getShipping } from "./transport";

export default function App() {

  const [postalCode, setPostalCode] = useState("");

  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [product3, setProduct3] = useState(null);
  const [product4, setProduct4] = useState(null);

  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [search3, setSearch3] = useState("");
  const [search4, setSearch4] = useState("");

  const [sqm1, setSqm1] = useState("");
  const [sqm2, setSqm2] = useState("");
  const [sqm3, setSqm3] = useState("");
  const [sqm4, setSqm4] = useState("");

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
    calcBoxes(sqm1, product1?.sqmBox);

  const result2 =
    calcBoxes(sqm2, product2?.sqmBox);

  const result3 =
    calcBoxes(sqm3, product3?.sqmBox);

  const result4 =
    calcBoxes(sqm4, product4?.sqmBox);

  const totalBoxes =
    result1.boxes +
    result2.boxes +
    result3.boxes +
    result4.boxes;

  const totalWeightProducts =

    result1.boxes * (product1?.kgBox || 0) +
    result2.boxes * (product2?.kgBox || 0) +
    result3.boxes * (product3?.kgBox || 0) +
    result4.boxes * (product4?.kgBox || 0);

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
    search,
    setSearch,
    product,
    setProduct,
    sqm,
    setSqm,
    result
  ) => {

    const filteredProducts = products.filter((p) =>
      p.ref.toLowerCase().includes(search.toLowerCase())
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setProduct(null);
          }}
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

        {search.length >= 2 && !product && (

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
                onClick={() => {
                  setProduct(p);
                  setSearch(p.ref);
                }}
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

        {product && (

          <div
            style={{
              marginTop: "12px",
              fontSize: "15px",
              lineHeight: "1.6"
            }}
          >

            <div>
              <strong>m² caixa:</strong>{" "}
              {product.sqmBox}
            </div>

            <div>
              <strong>kg caixa:</strong>{" "}
              {product.kgBox}
            </div>

            <div>
              <strong>Caixas:</strong>{" "}
              {result.boxes}
            </div>

            <div>
              <strong>m² reais:</strong>{" "}
              {result.realSqm.toFixed(2)}
            </div>

          </div>

        )}

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
              search1,
              setSearch1,
              product1,
              setProduct1,
              sqm1,
              setSqm1,
              result1
            )}

          </div>

          <div className="bg-white rounded-3xl shadow-md p-7">

            {renderReference(
              "Referência 2",
              search2,
              setSearch2,
              product2,
              setProduct2,
              sqm2,
              setSqm2,
              result2
            )}

          </div>

          <div className="bg-white rounded-3xl shadow-md p-7">

            {renderReference(
              "Referência 3",
              search3,
              setSearch3,
              product3,
              setProduct3,
              sqm3,
              setSqm3,
              result3
            )}

          </div>

          <div className="bg-white rounded-3xl shadow-md p-7">

            {renderReference(
              "Referência 4",
              search4,
              setSearch4,
              product4,
              setProduct4,
              sqm4,
              setSqm4,
              result4
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
