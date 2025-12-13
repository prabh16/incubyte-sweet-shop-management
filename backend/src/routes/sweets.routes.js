const express = require("express");
const router = express.Router();

const {
  getSweets,
  createSweet,
} = require("../controllers/sweets.controller");

router.get("/", getSweets);
router.post("/", createSweet);

module.exports = router;
