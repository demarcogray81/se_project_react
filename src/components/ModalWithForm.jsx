import React from "react";
import PropTypes from "prop-types";
import "../styles/ModalWithForm.css";

function ModalWithForm({
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled,
  children,
  altActionLabel,
  altActionLinkText,
  onAltAction,
  contentClassName = "",

  submitClassName = "",

  rootClassName = "",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} ${rootClassName}`}>
      <div
        className={`modal__content modal__content_type_form ${contentClassName}`}
      >
        <h2 className="modal__title modal__text">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}

          <div className="modal__actions">
            <button
              type="submit"
              className="modal__save modal__text"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>

            {altActionLabel && altActionLinkText && (
              <p className="modal__alt-action">
                <span className="modal__alt-label">{altActionLabel}</span>
                <button
                  type="button"
                  className="modal__alt-link"
                  onClick={onAltAction}
                >
                  {altActionLinkText}
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool,
  altActionText: PropTypes.shape({
    label: PropTypes.string,
    linkText: PropTypes.string,
  }),
  onAltAction: PropTypes.func,
  contentClassName: PropTypes.string,
};

export default ModalWithForm;
