require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const UnauthorizedError = require("./errors/unauthorizedError");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const app = express();

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(authRoutes);
app.use(userRoutes);

app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
