const express = require("express");
const router = express.Router();
const {getAllSweets, addSweet} = require("../controllers/sweets.controller");

router.get("/", getAllSweets);
router.post("/", addSweet);

module.exports = router;
