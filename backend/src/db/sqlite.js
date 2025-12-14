const Database = require("better-sqlite3");
const path = require("path");

// This resolves to: incubyte-sweet-shop-management/backend/sweetshop.db
const dbPath = path.join(__dirname, "..", "..", "sweetshop.db");

const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS sweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL
  )
`).run();

module.exports = db;
