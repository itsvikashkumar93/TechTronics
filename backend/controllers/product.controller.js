const productModel = require("../models/product.model");

module.exports.getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.json(products);
};

module.exports.getProductById = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.json(product);
};

module.exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    category,
    offer,
    image,
    brand,
    stock,
    rating,
  } = req.body;

  const product = await productModel.create({
    name,
    price,
    description,
    category,
    offer,
    brand,
    image,
    stock,
    rating,
  });
  res.json(product);
};

module.exports.deleteProduct = async (req, res) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  res.json(product);
};
