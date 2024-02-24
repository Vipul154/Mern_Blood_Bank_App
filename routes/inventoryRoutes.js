const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");
const router = express.Router();

//routes
//1. Add inventory || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//2. Get records || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
