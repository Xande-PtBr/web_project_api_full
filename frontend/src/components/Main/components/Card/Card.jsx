import Trash from "../../../../images/Trash.png";
import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import ImagePopup from "../../../../components/Main/components/Popup/components/ImagePopup/ImagePopup";

function Card(props) {
  const { name, link, likes, owner } = props.card;
  const { handleOpenPopup, handleCardLike, onCardDelete } = props;
  const imageComponent = { children: <ImagePopup card={props.card} /> };
  const { currentUser } = useContext(CurrentUserContext);
  // VERIFICAR SE O ID DO USUARIO ATUAL ESTÁ NO ARRAY DE LIKES DO CARD
  const isLiked = likes.some((like) => like === currentUser._id);
  console.log(isLiked, "isLiked");
  // Verificar se o usuário atual “curtiu” o cartão
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "elements__like-active" : ""
  }`;

  return (
    <div className="elements__box">
      {currentUser._id === owner && (
        <img
          src={Trash}
          alt="lixeira"
          onClick={() => onCardDelete(props.card)}
          className="elements__trash"
        />
      )}
      <img
        src={link}
        alt={name}
        className="elements__image"
        onClick={() => handleOpenPopup(imageComponent)}
      />

      <div className="elements__contaner-title-like">
        <h3 className="elements__title">{name}</h3>
        <button
          className={cardLikeButtonClassName}
          onClick={() => handleCardLike(props.card)}
        />
      </div>
    </div>
  );
}

export default Card;
