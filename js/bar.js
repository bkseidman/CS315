let table;

function preload() {
  table = loadTable("data.csv", "csv", "header");
}

function setup() {
  createCanvas(900, 450);
  background(245);
  fill(20);
  textSize(16);

  // Confirm the CSV actually loaded
  text("CSV loaded ✅", 20, 30);
  text("Rows: " + table.getRowCount(), 20, 55);
  text("Columns: " + table.getColumnCount(), 20, 80);

  // Show a couple column names (helps confirm headers are correct)
  const cols = table.columns;
  text("First columns: " + cols.slice(0, 4).join(", "), 20, 105);
}

function draw() {}
