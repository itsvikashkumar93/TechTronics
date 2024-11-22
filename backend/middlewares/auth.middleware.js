const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await userModel.findOne({ _id: decoded.userId }).select("-password");

  req.user = user;
  next();
};

module.exports.isSeller = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
