const { Schema, model } = require("mongoose");

const orderScheme = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    default: null,
    required: [true, "Name is required"],
  },
  phone: {
    type: String,
    default: null,
    required: [true, "Phone is required"],
  },
  address: {
    type: String,
    default: null,
    required: [true, "Address is required"],
  },
  totalPrice: {
    type: Number,
    default: null,
  },
  orderProducts: [],
});

const Order = model("orders", orderScheme);

module.exports = Order;
