const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: String,
    price: Number,
    imgUrl: String,
    logoUrl: String,
    count: {
      type: Number,
      default: 1,
    },
    shop: {
      type: String,
      enum: ["muc", "kfc", "puzatahata", "mafia", "japoshka"],
    },
    whoAddToCart: [],
  },
  { versionKey: false, timestamps: true }
);

const Product = model("products", productSchema);

module.exports = Product;
