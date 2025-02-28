const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorizedError");

//---- busca todos os usuarios
const getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ menssage: "Erro interno do servidor" });
    });
};

//---- busca um usuario pelo Id
const getUserById = (req, res) => {
  Users.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

//------- cria um novo usuario
const createUser = (req, res, next) => {
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

const login = (req, res, next) => {
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

const getUserProfile = (req, res, next) => {
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
//----------------------- atualiza um usuario

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  Users.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  Users.findByIdAndUpdate(userId, { avatar }, { new: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      if (err.avatar === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.avatar === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

const deleteUser = (req, res) => {
  Users.findByIdAndDelete(req.params.userId)
    .orFail()
    .then(() => res.status(200).send("Usuario removido com sucesso"))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do usuário inválido" });
      }
      console.error("Erro ao buscar usuario", err);
      return res
        .status(500)
        .send({ message: "Erro interno do servidor ao remover usuario" });
    });
};
module.exports = {
  login,
  getUsers,
  getUserProfile,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  deleteUser,
};
