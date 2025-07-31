import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  // validate
  useEffect(() => {
    setIsValid(
      formData.email.trim().length > 0 && formData.password.length >= 8
    );
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  }, []);

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
      buttonText="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      altActionLabel="or"
      altActionLinkText="Sign Up"
      onAltAction={() => {
        onClose();
        onSwitchToRegister();
      }}
    >
      <p>Email</p>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="modal__input"
      />

      <p>Password</p>
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

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSwitchToRegister: PropTypes.func.isRequired,
};
