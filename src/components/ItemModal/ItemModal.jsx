import "./ItemModal.css";
import { useState } from "react";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
    console.log("Delete button clicked");
  };

  const handleConfirmDelete = () => {
    onDelete(card._id);
    setIsConfirmationOpen(false);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`modal__content modal__content_type_image ${
          isConfirmationOpen ? "modal__content_closed" : ""
        }`}
      >
        <button onClick={onClose} type="button" className="modal__close" />
        <img
          src={card.link}
          alt={`${card.name} item`}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__info">
            {card.name && <h2 className="modal__caption">{card.name}</h2>}
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            className={`modal__delete-button ${
              !card.name ? "modal__delete-button--align-weather" : ""
            }`}
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>

      {isConfirmationOpen && (
        <div className="modal__confirmation-overlay">
          <div className="modal__confirmation">
            <button
              onClick={() => setIsConfirmationOpen(false)}
              type="button"
              className="modal__confirmation-close"
              aria-label="Close confirmation modal"
            />
            <p className="modal__title modal__confirmation_text">
              Are you sure you want to delete this item?
              <br />
              This action is irreversible.
            </p>
            <div className="modal__buttons">
              <button onClick={handleConfirmDelete}>Yes, delete item</button>
              <button onClick={() => setIsConfirmationOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemModal;
