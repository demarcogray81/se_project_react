import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../styles/ItemModal.css";

export default function ItemModal({ isOpen, card, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [confirming, setConfirming] = useState(false);

  // Call hooks unconditionally
  useEffect(() => {
    if (!isOpen) return; // no-op when closed

    const onEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const isOwn =
    !!currentUser && String(card?.owner) === String(currentUser._id);

  const handleClose = () => {
    setConfirming(false);
    onClose();
  };

  const handleConfirmDelete = () => {
    if (card?._id) onDelete(card._id);
    handleClose();
  };

  // Now you can early-return safely (after hooks)
  if (!isOpen || !card) return null;

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleClose}
    >
      {!confirming ? (
        <div
          className="modal__content modal__content_type_image"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="modal__close"
            aria-label="Close"
            onClick={handleClose}
          />

          <div className="modal__body">
            <div className="modal__media">
              <img
                className="modal__image modal__image--natural"
                src={card.imageUrl || card.link}
                alt={card.name || "Item"}
              />
              <span className="modal__tag modal__tag--overlay">
                {card.name || card.title}
              </span>
            </div>

            <div className="modal__side">
              <p className="modal__weather-line">
                <span className="modal__weather-label">Weather:</span>{" "}
                {card.weather}
              </p>
            </div>
          </div>

          {isOwn && (
            <button
              type="button"
              className="modal__delete-link"
              onClick={() => setConfirming(true)}
            >
              Delete item
            </button>
          )}
        </div>
      ) : (
        <div
          className="modal__content modal__content_type_confirm"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="modal__close"
            aria-label="Close"
            onClick={handleClose}
          />
          <div className="confirm">
            <h2 className="confirm__title">
              Are you sure you want to delete this item?
            </h2>
            <p className="confirm__subtitle">This action is irreversible.</p>
            <button
              type="button"
              className="confirm__delete"
              onClick={handleConfirmDelete}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="confirm__cancel"
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
