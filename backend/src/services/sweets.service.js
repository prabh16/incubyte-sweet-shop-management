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

const getSweetsBySearch = ({ name, category, minPrice, maxPrice }) => {
  let query = "SELECT * FROM sweets WHERE 1=1";
  const params = [];

  if (name) {
    query += " AND name LIKE ?";
    params.push(`%${name}%`);
  }

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }

  if (minPrice) {
    query += " AND price >= ?";
    params.push(minPrice);
  }

  if (maxPrice) {
    query += " AND price <= ?";
    params.push(maxPrice);
  }

  return db.prepare(query).all(...params);
};

const updateSweet = (id, data) => {
  const { name, category, price, quantity } = data;

  db.prepare(`
    UPDATE sweets
    SET name = ?, category = ?, price = ?, quantity = ?
    WHERE id = ?
  `).run(name, category, price, quantity, id);
};

const deleteSweet = (id) => {
  db.prepare("DELETE FROM sweets WHERE id = ?").run(id);
};

const purchaseSweet = (id) => {
  db.prepare(`
    UPDATE sweets
    SET quantity = quantity - 1
    WHERE id = ? AND quantity > 0
  `).run(id);
};

const restockSweet = (id, qty) => {
  db.prepare(`
    UPDATE sweets
    SET quantity = quantity + ?
    WHERE id = ?
  `).run(qty, id);
};



module.exports = {
  getAllSweets,
  addSweet,
  getSweetsBySearch,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};
