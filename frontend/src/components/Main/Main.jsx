import { useContext } from "react";
import add from "../../images/add.png";
import edit from "../../images/edit.png";
import Footer from "../../components/Footer/Footer";
import Popup from "../../components/Main/components/Popup/Popup";
import NewCard from "../../components/Main/components/Popup/components/NewCard/NewCard";
import EditProfile from "../../components/Main/components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "../../components/Main/components/Popup/components/EditAvatar/EditAvatar";
import Card from "../../components/Main/components/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  handleCardLike,
  cards,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
  popup,
}) {
  const newCardPopup = { title: "New card", children: <NewCard /> };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };

  const { currentUser } = useContext(CurrentUserContext);
  if (!currentUser) {
    return null;
  }

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Avatar"
              className="profile__image"
            />
            <button
              className="profile__edit-avatar-button"
              onClick={() => onOpenPopup(editAvatarPopup)}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-name-edit-button">
              <p className="profile__info-name">{currentUser.name}</p>

              <button
                className="profile__edit-button"
                onClick={() => onOpenPopup(editProfilePopup)}
              >
                <img src={edit} alt="Editar" />
              </button>
            </div>
            <p className="profile__info-sobre-mim">{currentUser.about}</p>
          </div>

          <button
            className="profile__add-button"
            onClick={() => onOpenPopup(newCardPopup)}
          >
            <img src={add} alt="Adicionar" />
          </button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              handleCardLike={handleCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>

        <Footer />
        {popup && (
          <Popup onClose={onClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}

export default Main;
