export default function EditAvatar() {
  return (
    <form className="popup__form popup__form-edit-avatar">
      <input
        type="url"
        className="popup__form-input popup__input-avatar"
        id="avatar-input"
        name="avatar"
        placeholder="Link da imagem"
        required
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
