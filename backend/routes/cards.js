const { Router } = require("express");
const router = new Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const auth = require("../middlewares/auth");

router.get("/", getCards); //------ pesquisa cards

router.post("/", auth, createCard); //------ cria card

router.delete("/:cardId", auth, deleteCard); //------ delete card

router.put("/:cardId/likes", auth, likeCard); //------ add like do card

router.delete("/:cardId/likes", auth, dislikeCard); //--remove like do card

module.exports = router;
