const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../../sweetshop.db");

const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS sweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER DEFAULT 0
  )
`).run();

module.exports = db;
