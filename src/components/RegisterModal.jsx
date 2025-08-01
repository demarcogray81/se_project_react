import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { name, avatar, email, password } = formData;
    setIsValid(
      name.trim() && avatar.trim() && email.trim() && password.length >= 8
    );
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  }, []);

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
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      altActionLabel="or"
      altActionLinkText="Log In"
      onAltAction={() => {
        onClose();
        onSwitchToRegister();
      }}
    >
      <p>Name*</p>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        minLength={2}
        maxLength={30}
        className="modal__input"
      />

      <p>Avatar URL*</p>
      <input
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={handleChange}
        required
        className="modal__input"
      />

      <p>Email*</p>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="modal__input"
      />

      <p>Password*</p>
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={8}
        className="modal__input"
      />
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired,
};
