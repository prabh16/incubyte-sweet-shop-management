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
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", authMiddleware, getSweets);
router.post("/", authMiddleware, adminMiddleware, createSweet);

router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, adminMiddleware, updateSweetById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweetById);

router.post("/:id/purchase", authMiddleware, purchaseSweetById);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweetById);

module.exports = router;
