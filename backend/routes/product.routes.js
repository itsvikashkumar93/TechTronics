const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { isLoggedIn, isSeller } = require("../middlewares/auth.middleware");

router.get("/", isLoggedIn, productController.getAllProducts);
router.get("/:id", isLoggedIn, productController.getProductById);
router.post("/", isLoggedIn, isSeller, productController.createProduct);
router.delete("/:id", isLoggedIn, isSeller, productController.deleteProduct);

module.exports = router;
