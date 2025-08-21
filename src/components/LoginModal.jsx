import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onLogin(formData);
    },
    [formData, onLogin]
  );

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Log In"
      buttonText={isLoading ? "Signing in..." : "Sign In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!formData.email || !formData.password || isLoading}
      altActionLabel="or"
      altActionLinkText="Sign Up"
      onAltAction={onSwitchToRegister}
      contentClassName="modal__content-login modal__content-edit"
    >
      <label className="modal__label modal__text" htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          className="modal__input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label modal__text" htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          type="password"
          className="modal__input"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
      </label>
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSwitchToRegister: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
