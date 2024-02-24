//Here we will be dealing with auth related route for the users, that's why this name.

//importing experss
const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

//creating the router object
const router = express.Router();

//register route
router.post("/register", registerController);

//login route
router.post("/login", loginController);

//export
module.exports = router;
