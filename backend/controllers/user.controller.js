const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  // console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ message: "User registered successfully", user, token });
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ message: "User logged in successfully", user, token });
};

module.exports.profile = async (req, res) => {
  // console.log(req.user);

  // const user = await userModel.findById(req.user.userId);
  res.json({ message: "User profile fetched successfully", user: req.user });
};

module.exports.logout = async (req, res) => {
  req.cookies.token = "";
  res.json({ message: "User logged out successfully" });
};
