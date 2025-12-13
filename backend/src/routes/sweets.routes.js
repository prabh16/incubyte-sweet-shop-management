const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
  getSweets,
  createSweet,
  searchSweets,
  updateSweetById,
  deleteSweetById,
  purchaseSweetById,
  restockSweetById,
} = require("../controllers/sweets.controller");

router.get("/", authMiddleware, getSweets);
router.post("/", authMiddleware, createSweet);

router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, updateSweetById);
router.delete("/:id", authMiddleware, deleteSweetById);

router.post("/:id/purchase", authMiddleware, purchaseSweetById);
router.post("/:id/restock", authMiddleware, restockSweetById);

module.exports = router;
