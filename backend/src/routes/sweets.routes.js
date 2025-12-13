const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
  getSweets,
  createSweet,
} = require("../controllers/sweets.controller");

router.get("/", authMiddleware, getSweets);
router.post("/", authMiddleware, createSweet);

module.exports = router;
