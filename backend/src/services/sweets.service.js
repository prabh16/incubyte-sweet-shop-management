const db = require("../db/sqlite");

const getAllSweets = () => {
  const stmt = db.prepare("SELECT * FROM sweets");
  return stmt.all();
};

const addSweet = ({ name, price, quantity = 0 }) => {
  const stmt = db.prepare(`
    INSERT INTO sweets (name, price, quantity)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(name, price, quantity);

  return {
    id: result.lastInsertRowid,
    name,
    price,
    quantity,
  };
};

module.exports = {
  getAllSweets,
  addSweet,
};
