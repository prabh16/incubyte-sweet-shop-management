const {
  getAllSweets,
  addSweet,
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

module.exports = {
  getSweets,
  createSweet,
};
