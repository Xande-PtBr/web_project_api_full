import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

function EditAvatar() {
  CONST[(avatar, setAvatar)] = useState(currentUser.avatar);
  const userContext = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const { currentUser, handleUpdateAvatar } = userContext;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateAvatar({ avatar: event.target.avatar.value }); // Atualiza as informações do usuário
  };

  // Impede o comportamento padrão de envio do formulário
  // e chama a função handleUpdateAvatar
  // Renderiza o formulário
  // Atualiza o link da imagem (avatar) quando a entrada for alterada

  return (
    <form
      className="popup__form popup__form-edit-avatar"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__form-input popup__input-avatar"
        id="avatar-input"
        name="avatar"
        placeholder="Link da imagem"
        required
        // Atualiza o link da imagem (avatar) quando a entrada for alterada
        value={avatar}
        // Atualiza o link da imagem (avatar) quando a entrada for alterada
        onChange={handleSubmit}
      />
      <span
        id="avatar-input-error"
        className="popup__message-input-error"
      ></span>
      <button
        type="submit"
        className="popup__button-save popup__button-save-avatar"
      >
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
