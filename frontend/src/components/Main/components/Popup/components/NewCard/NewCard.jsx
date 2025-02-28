import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const userContext = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const { currentUser, handleAddPlaceSubmit } = userContext;
  const [name, setName] = useState(currentUser.imageName); // Adicione variável de estado para nome
  const [link, setLink] = useState(currentUser.link); // Adicione variável de estado para link

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlaceSubmit({ name, link }); // Atualiza as informações do usuário
  }; // Impede o comportamento padrão de envio do formulário

  return (
    <form className="popup__form popup__form-card" onSubmit={handleSubmit}>
      <input
        type="text"
        className="popup__input-card-title"
        id="card-title"
        name="name"
        placeholder="Título"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span id="card-title-error" className="popup__message-input-error"></span>
      <input
        type="url"
        className="popup__input-card-link-img"
        id="link-de-imagem"
        name="link"
        placeholder="Link de imagem"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span
        id="link-de-imagem-error"
        className="popup__message-input-error"
      ></span>
      <button type="submit" className="popup__button-new-card">
        Criar
      </button>
    </form>
  );
}
