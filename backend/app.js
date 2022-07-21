const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

require("dotenv").config({ path: "configs/config.env" });

//Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Importing Routers
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

//using Routes
app.use("/api/v1", todoRoutes);
app.use("/api/v1", userRoutes);

module.exports = app;
