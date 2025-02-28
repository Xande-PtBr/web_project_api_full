const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UnauthorizedError = require("../errors/unauthorizedError");

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => res.status(201).send({ email: user.email, _id: user._id }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Email ou senha inválidos");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Email ou senha inválidos");
        }

        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET || "not-so-secret-string",
          {
            expiresIn: "7d",
          }
        );

        res.send({ token });
      });
    })
    .catch(next);
};
