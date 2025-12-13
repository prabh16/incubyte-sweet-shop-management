const mapSweetPayload = (body) => {
  const { name, price } = body;
  return { name, price };
};

const sweetValidationRules = [
  {
    check: ({ name }) => !name,
    message: "Name is required",
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

const getAllSweets = (req, res) => {
  return res.status(200).json([]);
};

const addSweet = (req, res) => {
  const payload = mapSweetPayload(req.body);
  const error = validateSweetInput(payload);

  if (error) {
    return res.status(400).json({ message: error });
  }

  return res.status(201).json({ message: "Sweet added" });
};


module.exports = {
  getAllSweets, addSweet,
};
