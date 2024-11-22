const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");

router.get("/", (req, res) => {
  res.send("Hello World");
});

// router.get("/products", async (req, res) => {
//   const products = await productModel.find();
//   res.json(products);
// });

module.exports = router;
