const {
  getAllSweets,
  addSweet,
  getSweetsBySearch,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../services/sweets.service");

const sweetValidationRules = [
  {
    check: ({ name }) => !name,
    message: "Name is required",
  },

  {
    check: ({ price }) => price === undefined,
    message: "Price is required",
  },

];

const validateSweetInput = (payload) => {
  for (const rule of sweetValidationRules) {
    if (rule.check(payload)) {
      return rule.message;
    }
  }
  return null;
};

const getSweets = (req, res) => {
  const sweets = getAllSweets();
  return res.status(200).json(sweets);
};

const createSweet = (req, res) => {
  const { name, category, price } = req.body;

  const error = validateSweetInput({ name, price });
  if (error) {
    return res.status(400).json({ message: error });
  }

  const sweet = addSweet({ name, category, price });
  return res.status(201).json(sweet);
};

const searchSweets = (req, res) => {
  const sweets = getSweetsBySearch(req.query);
  res.json(sweets);
};

const updateSweetById = (req, res) => {
  updateSweet(req.params.id, req.body);
  res.json({ message: "Sweet updated" });
};

const deleteSweetById = (req, res) => {
  if (req.headers["x-admin"] !== "true") {
    return res.status(403).json({ message: "Admin only" });
  }
  deleteSweet(req.params.id);
  res.json({ message: "Sweet deleted" });
};

const purchaseSweetById = (req, res) => {
  purchaseSweet(req.params.id);
  res.json({ message: "Sweet purchased" });
};

const restockSweetById = (req, res) => {
  if (req.headers["x-admin"] !== "true") {
    return res.status(403).json({ message: "Admin only" });
  }
  restockSweet(req.params.id, req.body.quantity || 1);
  res.json({ message: "Sweet restocked" });
};

module.exports = {
  getSweets,
  createSweet,
  searchSweets,
  updateSweetById,
  deleteSweetById,
  purchaseSweetById,
  restockSweetById,
};
