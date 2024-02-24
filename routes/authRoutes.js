//Here we will be dealing with auth related route for the users, that's why this name.

//importing experss
const express = require("express");
const {
  registerController,
  loginController,
  getCurrentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

//creating the router object
const router = express.Router();

//register route
router.post("/register", registerController);

//login route
router.post("/login", loginController);

//getCurrentUser route
router.get("/current-user", authMiddleware, getCurrentUserController);

//export
module.exports = router;
