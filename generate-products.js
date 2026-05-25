const fs = require("fs");

const csv = fs.readFileSync(
  "Book 15(Folha1).csv",
  "utf8"
);

const lines = csv.split("\n");

const products = [];

for (let i = 1; i < lines.length; i++) {

  const line = lines[i].trim();

  if (!line) continue;

  const cols = line.split(";");

  if (cols.length < 15) continue;

  const ref = cols[0]?.trim();

  const description =
    cols[2]?.trim();

  const sqmBox = parseFloat(
    cols[11]
      ?.replace(",", ".")
      ?.trim()
  );

  const kgBox = parseFloat(
    cols[13]
      ?.replace(",", ".")
      ?.trim()
  );

  if (
    !ref ||
    isNaN(sqmBox) ||
    isNaN(kgBox)
  ) {
    continue;
  }

  products.push({
    ref,
    name: description,
    sqmBox,
    kgBox,
  });

}

const output =
  "export const products = " +
  JSON.stringify(products, null, 2);

fs.writeFileSync(
  "src/products.js",
  output
);

console.log(
  `✅ products.js criado com ${products.length} produtos`
);
