const Cards = require("../models/card");

//---------------------------- busca todos os Cards
const getCards = (_, res) => {
  Cards.find({})
    .then((Cards) => res.status(200).send(Cards))
    .catch((err) => {
      res.status(500).send({ menssage: "Erro interno do servidor" });
    });
};

//---------------------------- cria um novo card
const createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((newcard) => res.status(201).send(newcard))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Dados inválidos", details: err.menssage });
      }
      console.error("Erro ao criar Card", err);
      return res
        .status(500)
        .send({ message: "Erro interno do servidor ao criar Card" });
    });
};

//--------------------------- deleta um card
const deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => {
      res.status(200).send({ message: "Card deletado com sucesso" });
    })
    .catch(() => {
      return res.status(500).send({ message: "Erro ao remover Card" });
    });
};

//---------------------------- likes card
const likeCard = (req, res) => {
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // adicione _id ao array se ele não estiver lá
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Error ao dar like no cartão");
      error.status = 500;
      throw error;
    })
    .then((newCard) => {
      return res.status(200).send(newCard);
    })
    .catch((error) => {
      console.error("likeCard Error:", error);
      return res.status(500).send({ message: "Erro ao dar like no cartão" });
      /* next(error); */
    });
};

//---------------------------- dislikes cards
const dislikeCard = (req, res) => {
  return Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id do array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Error ao dar dislike no cartão");
      error.status = 500;
      throw error;
    })
    .then((newCard) => {
      return res.status(200).send(newCard);
    })
    .catch((error) => {
      console.error("likeCard Error:", error);
      return res.status(500).send({ message: "Erro ao dar dislike no cartão" });
      /* next(error); */
    });
};
//----------------------------------------------------------------------------

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
