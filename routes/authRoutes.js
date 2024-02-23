//Here we will be dealing with auth related route for the users, that's why this name.

//importing experss
const express = require("express");
const { registerController } = require("../controllers/authController");

//creating the router object
const router = express.Router();

//register route
router.post("/register", registerController);

//export
module.exports = router;
