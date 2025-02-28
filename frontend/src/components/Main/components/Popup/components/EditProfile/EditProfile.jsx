import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

function EditProfile() {
  const userContext = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name); // Adicione variável de estado para nome
  const [description, setDescription] = useState(currentUser.about); // Adicione variável de estado para descrição

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description }); // Atualiza as informações do usuário
  }; // Impede o comportamento padrão de envio do formulário

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="popup__form-input popup__input-name"
        id="name-input"
        name="name"
        placeholder="Nome"
        required
        minLength="2"
        maxLength="40"
        value={name} // Vincular nome ao campo de entrada
        onChange={handleNameChange} // Adicionar manipulador onChange
      />
      <span id="name-input-error" className="popup__message-input-error"></span>
      <input
        type="text"
        className="popup__form-input popup__input-sobre-mim"
        id="about-input"
        name="about"
        placeholder="Sobre mim"
        required
        minLength="2"
        maxLength="200"
        value={description} // Vincular nome ao campo de entrada
        onChange={handleDescriptionChange} // Adicionar manipulador onChange
      />
      <span
        id="about-input-error"
        className="popup__message-input-error"
      ></span>
      <button type="submit" className="popup__button-save">
        Salvar
      </button>
    </form>
  );
}
export default EditProfile;
