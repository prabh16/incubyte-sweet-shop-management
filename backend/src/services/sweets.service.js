const db = require("../db/sqlite");

const getAllSweets = () => {
  const stmt = db.prepare("SELECT * FROM sweets");
  return stmt.all();
};

const addSweet = ({ name, category, price, quantity = 0 }) => {
  const stmt = db.prepare(`
    INSERT INTO sweets (name, category, price, quantity)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(name, category, price, quantity);

  return {
    id: result.lastInsertRowid,
    name,
    category,
    price,
    quantity,
  };
};

module.exports = {
  getAllSweets,
  addSweet,
};
