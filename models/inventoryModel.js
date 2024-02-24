const mongoose = require("mongoose");
const inventorySchema = new mongoose.userSchema(
  {
    inventoryType: {
      type: String,
      require: [true, "inventory type required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      require: [true, "Blood Group required"],
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quantity is required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: [true, "organisation is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: function () {
        return this.inventoryType === "out";
      },
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Inventory", inventorySchema);
