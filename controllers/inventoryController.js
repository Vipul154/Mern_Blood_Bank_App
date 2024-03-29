const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//create inventory controller
const createInventoryController = async (req, res) => {
  try {
    //destructuring from req.body
    const { email, inventoryType } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user not found.");
    }
    if (inventoryType === "in" && user.role !== "donor") {
      throw new Error("Not a donor account");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital account");
    }
    //save it now if all validation pass
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Record Added",
      inventory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in inventory api",
      err,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get-all inventory api",
      error,
    });
  }
};
module.exports = { createInventoryController, getInventoryController };
