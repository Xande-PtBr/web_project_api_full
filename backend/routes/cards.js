const { Router } = require("express");
const router = new Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards); //------ pesquisa cards

router.post("/", createCard); //------ cria card

router.delete("/:cardId", deleteCard); //------ delete card

router.put("/:cardId/likes", likeCard); //------ add like do card

router.delete("/:cardId/likes", dislikeCard); //--remove like do card

module.exports = router;
