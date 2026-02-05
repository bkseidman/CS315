let table;

const CITY = "San Francisco"; // must match exactly
let monthly = new Array(12).fill(0);   // total precipitation per month
let counts = new Array(12).fill(0);    // number of rows per month (for avg later)

function preload() {
  table = loadTable("data.csv", "csv", "header");
}

function setup() {
  createCanvas(900, 450);
  textFont("Arial");
  textSize(14);

  // 1) Filter rows + aggregate
  for (let r = 0; r < table.getRowCount(); r++) {
    const city = table.getString(r, "Station.City");
    if (city !== CITY) continue;

    const monthStr = table.getString(r, "Date.Month"); // "1".."12"
    const m = int(monthStr) - 1; // convert to 0..11
    if (m < 0 || m > 11) continue;

    const pStr = table.getString(r, "Data.Precipitation");
    const p = parseFloat(pStr);
    if (Number.isNaN(p)) continue;

    monthly[m] += p;
    counts[m] += 1;
  }

  // 2) Display the computed numbers (sanity check)
  background(245);
  fill(20);

  text(`City: ${CITY}`, 20, 30);
  const totalRows = counts.reduce((a, b) => a + b, 0);
  text(`Rows used: ${totalRows}`, 20, 55);

  text("Monthly totals (precip):", 20, 85);

  let y = 110;
  for (let m = 0; m < 12; m++) {
    const total = monthly[m];
    const n = counts[m];
    const avg = n > 0 ? total / n : 0;
    text(
      `Month ${m + 1}: total=${total.toFixed(2)}  rows=${n}  avg=${avg.toFixed(3)}`,
      20,
      y
    );
    y += 20;
  }
}

function draw() {}
