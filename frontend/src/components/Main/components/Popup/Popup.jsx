import Close_Icon from "../../../../images/Close_Icon.png";

export default function Popup(props) {
  //children é o conteúdo de popup
  const { onClose, title, children } = props;
  return (
    <div className="popup">
      <div
        className={`popup__Container ${!title ? "popup__Container-image" : ""}`}
      >
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
        <img
          src={Close_Icon}
          alt="icone close"
          className={`popup__close ${!title ? "popup__close-image" : ""}`}
          onClick={onClose}
        />
      </div>
    </div>
  );
}
