const getAllSweets = (req, res) => {
  return res.status(200).json([]);
};

const addSweet = (req, res) => {
  return res.status(201).json({ message: "Sweet added" });
};


module.exports = {
  getAllSweets, addSweet,
};
