const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  title: String,
  productImageUrl: String,
  description: String,
  price:Number
});

module.exports = Product;
