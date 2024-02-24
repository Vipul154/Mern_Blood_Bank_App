const userModel = require("../models/userModel");

//importing the bcryptjs package for hashing our passwords
const bcrypt = require("bcryptjs");

//importing jsonwebtokens for the secure generation of tokens
const jwt = require("jsonwebtoken");

//register API Controller
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

//login API Controller
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials. No such User Found",
      });
    }
    //but if the user exists, we check the password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials. Password is Incorrect.",
      });
    }
    //if even the password matches, then we generata a token for the user
    const payload = { userId: user._id };
    const secretKey = process.env.JWT_SECRET;
    const timeStamp = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey, timeStamp);
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in the Login API",
      error,
    });
  }
};

//GetCurrentUser API Controller
const getCurrentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Not able to get User, Error in getCurrentUserAPI",
    });
  }
};
//export
module.exports = {
  registerController,
  loginController,
  getCurrentUserController,
};
