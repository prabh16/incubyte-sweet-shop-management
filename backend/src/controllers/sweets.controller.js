const mapSweetPayload = (body) => {
  const { name, price } = body;
  return { name, price };
};

const getAllSweets = (req, res) => {
  return res.status(200).json([]);
};

const addSweet = (req, res) => {
  const { name } = mapSweetPayload(req.body);

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  return res.status(201).json({ message: "Sweet added" });
};


module.exports = {
  getAllSweets, addSweet,
};
