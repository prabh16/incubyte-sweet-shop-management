const mapSweetPayload = (body) => {
  const { name, price } = body;
  return { name, price };
};

const getAllSweets = (req, res) => {
  return res.status(200).json([]);
};

const addSweet = (req, res) => {
  mapSweetPayload(req.body);
  return res.status(201).json({ message: "Sweet added" });
};


module.exports = {
  getAllSweets, addSweet,
};
