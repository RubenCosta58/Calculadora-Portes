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

  const fuelRates = {
    1: 11.76,
    2: 13.91,
    3: 15.40,
    4: 15.84,
    5: 46.86,
    6: 55.55,
  };

  const calcBoxes = (sqm, sqmBox) => {

    if (!sqm || !sqmBox) {

      return {
        boxes: 0,
        realSqm: 0,
      };

    }

    const boxes =
      Math.ceil(Number(sqm) / sqmBox);

    const realSqm =
      boxes * sqmBox;

    return {
      boxes,
      realSqm,
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

  const zone =
    getZone(postalCode);

  const baseShipping =
    getShipping(zone, totalWeight);

  const fuelRate =
    fuelRates[zone] || 0;

  const shippingPrice =

    baseShipping > 0

      ? (
          baseShipping *
          (1 + fuelRate / 100)
        ).toFixed(2)

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

    doc.text(
      `Valor Transporte: ${shippingPrice} €`,
      20,
      110
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

      p.ref
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    return (

      <div style={{ marginBottom: "20px" }}>

        <label
          style={{
            fontWeight: "bold",
            display: "block",
            marginBottom: "8px",
            fontSize: "18px",
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
            fontSize: "16px",
          }}
        />

        {search.length >= 2 && !product && (

          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "10px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
              maxHeight: "220px",
              overflowY: "auto",
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
                  borderBottom:
                    "1px solid #f1f1f1",
                }}
              >

                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {p.ref}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  {p.name}
                </div>

              </div>

            ))}

          </div>

        )}

        {product && (

          <div
            style={{
              background: "#f9fafb",
              borderRadius: "14px",
              padding: "12px",
              marginBottom: "12px",
              fontSize: "14px",
              lineHeight: "1.8",
            }}
          >

            <div>
              <strong>Referência:</strong>{" "}
              {product.ref}
            </div>

            <div>
              <strong>Coleção:</strong>{" "}
              {product.name}
            </div>

            <div>
              <strong>m² caixa:</strong>{" "}
              {product.sqmBox}
            </div>

            <div>
              <strong>kg caixa:</strong>{" "}
              {product.kgBox}
            </div>

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
            padding: "12px",
            width: "100%",
            borderRadius: "14px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        />

        <div
          style={{
            marginTop: "12px",
            fontSize: "15px",
            lineHeight: "1.8",
          }}
        >

          <div>
            <strong>Caixas:</strong>{" "}
            {result.boxes}
          </div>

          <div>
            <strong>m² reais:</strong>{" "}
            {result.realSqm.toFixed(2)}
          </div>

        </div>

      </div>

    );

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "25px",
            marginBottom: "50px",
          }}
        >

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "28px",
            }}
          >

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

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "28px",
            }}
          >

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

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "28px",
            }}
          >

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

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "28px",
            }}
          >

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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >

          <div
            style={{
              background: "#000",
              borderRadius: "30px",
              padding: "30px",
              width: "450px",
            }}
          >

            <div
              style={{
                color: "#fff",
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >

              CÓDIGO POSTAL

            </div>

            <input
              type="text"
              value={postalCode}
              onChange={(e) =>
                setPostalCode(e.target.value)
              }
              placeholder="8100"
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "22px",
                border: "none",
                fontSize: "36px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            />

          </div>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr",
            gap: "25px",
          }}
        >

          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              padding: "35px",
            }}
          >

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                marginBottom: "30px",
              }}
            >

              Dados do Produto

            </div>

            <div
              style={{
                fontSize: "28px",
                lineHeight: "2.1",
              }}
            >

              <div>
                <strong>
                  Caixas necessárias :
                </strong>{" "}
                {totalBoxes}
              </div>

              <div>
                <strong>
                  m² reais finais :
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

          <div
            style={{
              background: "#000",
              color: "#fff",
              borderRadius: "28px",
              padding: "35px",
            }}
          >

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                marginBottom: "30px",
              }}
            >

              Resultado Transporte

            </div>

            <div
              style={{
                fontSize: "28px",
                lineHeight: "2.1",
              }}
            >

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

          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              padding: "35px",
            }}
          >

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                marginBottom: "30px",
              }}
            >

              Resumo Final

            </div>

            <div
              style={{
                fontSize: "28px",
                lineHeight: "2.1",
              }}
            >

              <div>
                <strong>
                  Produtos :
                </strong>{" "}
                {[
                  product1,
                  product2,
                  product3,
                  product4,
                ]
                  .filter(Boolean)
                  .length}
              </div>

              <div>
                <strong>
                  Palete :
                </strong>{" "}
                {palletWeight} kg
              </div>

              <div>
                <strong>
                  Combustível :
                </strong>{" "}
                {fuelRate}%
              </div>

            </div>

          </div>

        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >

          <button
            onClick={exportPDF}
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "22px",
              padding:
                "18px 40px",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >

            EXPORTAR PDF

          </button>

        </div>

      </div>

    </div>

  );

}
