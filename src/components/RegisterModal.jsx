import React, { useState, useCallback, useId } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm";
import "../styles/RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
  isLoading = false,
}) {
  const uid = useId();
  const emailId = `${uid}-email`;
  const passId = `${uid}-password`;
  const nameId = `${uid}-name`;
  const avatarId = `${uid}-avatar`;

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onRegister(formData);
    },
    [formData, onRegister]
  );

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Saving..." : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={
        !formData.email ||
        !formData.password ||
        !formData.name ||
        !formData.avatar
      }
      altActionLabel="or"
      altActionLinkText="Log In"
      onAltAction={onSwitchToLogin}
      contentClassName="modal__content-signup"
    >
      <label className="modal__label modal__text" htmlFor={emailId}>
        Email *
        <input
          id={emailId}
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label modal__text" htmlFor={passId}>
        Password *
        <input
          id={passId}
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
      </label>

      <label className="modal__label modal__text" htmlFor={nameId}>
        Name *
        <input
          id={nameId}
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
        />
      </label>

      <label className="modal__label modal__text" htmlFor={avatarId}>
        Avatar URL *
        <input
          id={avatarId}
          name="avatar"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
