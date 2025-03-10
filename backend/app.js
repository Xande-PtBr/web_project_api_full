require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const UnauthorizedError = require("./errors/unauthorizedError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI
      : "mongodb://localhost:27017/authdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(authRoutes);
app.use(errorLogger);

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);
app.use("*", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
