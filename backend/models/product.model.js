const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    brand: String,
    offer: Number,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    stock: Number,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
