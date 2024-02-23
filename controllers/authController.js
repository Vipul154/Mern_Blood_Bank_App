const userModel = require("../models/userModel");

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
