const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isLoggedIn } = require("../middlewares/auth.middleware");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/profile", isLoggedIn, userController.profile);
router.post("/logout", userController.logout);

module.exports = router;
