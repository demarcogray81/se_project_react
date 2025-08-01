import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../styles/ItemModal.css";

export default function ItemModal({ isOpen, card, onClose, onDelete }) {
  if (!isOpen || !card) return null;

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const deleteBtnClass = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close" />
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">{card.weather}</p>
          </div>
          <button
            className={deleteBtnClass}
            onClick={() => {
              onDelete(card._id);
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
