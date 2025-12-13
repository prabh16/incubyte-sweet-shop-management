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

try {
  db.prepare(`ALTER TABLE sweets ADD COLUMN category TEXT`).run();
} catch (err) {
  // column already exists → ignore
}

module.exports = db;
