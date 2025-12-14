const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const {
  getSweets,
  createSweet,
  searchSweets,
  updateSweetById,
  deleteSweetById,
  purchaseSweetById,
  restockSweetById,
} = require("../controllers/sweets.controller");

// ✅ NORMAL AUTH (ANY LOGGED-IN USER)
router.get("/", authMiddleware, getSweets);
router.get("/search", authMiddleware, searchSweets);
router.post("/:id/purchase", authMiddleware, purchaseSweetById);

// ✅ ADMIN ONLY
router.post("/", authMiddleware, adminMiddleware, createSweet);
router.put("/:id", authMiddleware, adminMiddleware, updateSweetById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweetById);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweetById);

module.exports = router;
