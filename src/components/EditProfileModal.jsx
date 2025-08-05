import React, { useContext, useState, useEffect, useCallback } from "react";
import "../styles/EditProfileModal.css";
import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PropTypes from "prop-types";

export default function EditProfileModal({ isOpen, onClose, onUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({ name: "", avatar: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    setIsValid(
      formData.name.trim().length >= 2 && formData.avatar.trim().length > 0
    );
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onUpdate(formData);
    },
    [formData, onUpdate]
  );

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        minLength={2}
        maxLength={30}
      />
      <input
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
