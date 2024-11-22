const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/mongodb");
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
dotenv.config();
connectToDB();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(4000);
