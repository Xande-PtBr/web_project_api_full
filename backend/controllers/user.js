const User = require("../models/user");
const NotFoundError = require("../errors/notFoundError");

module.exports.getUserProfile = (req, res, next) => {
  const userId = req.user._id; //obtendo o id do usuário

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }
      res.send(user);
    })
    .catch(next);
};
