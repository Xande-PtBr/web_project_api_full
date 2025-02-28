export default function InfoTooltip({ icon, message }) {
  return (
    <form className="popup__form popup__form-infoTooltip-register">
      <img
        className="popup__image-infoTooltip-sucess"
        src={icon}
        alt="icone register"
      />
      <p className="popup__message-infoTooltip-p1">{message}</p>
    </form>
  );
}
