const express = require("express");
const router = express.Router();
const {getAllSweets} = require("../controllers/sweets.controller");

router.get("/", getAllSweets);

module.exports = router;
