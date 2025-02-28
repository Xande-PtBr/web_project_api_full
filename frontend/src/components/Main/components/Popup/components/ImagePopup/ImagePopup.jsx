export default function ImagePopup(props) {
  const { name, link } = props.card;

  return (
    <div className="popup__Container-image">
      <img src={link} className="popup__view-image" alt={name} />
      <h2 className="popup__title-image">{name}</h2>
    </div>
  );
}
