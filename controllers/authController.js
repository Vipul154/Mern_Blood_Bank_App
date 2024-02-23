const userModel = require("../models/userModel");

//importing the bcryptjs package for hashing our passwords
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(200).send({
        message: "User already exists, Please try loggin in.",
      });
    }
    //if the user did not exist, we need to add him.
    //Now for the password hashing of our user, we can employ the 'bcrypt.js' file for hashing our password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Accessing the rest of the data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(`Register Controller Error : ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

//export
module.exports = { registerController };
