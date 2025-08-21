import "../styles/AddItemModal.css";
import ModalWithForm from "./ModalWithForm";
import { useEffect } from "react";
import useForm from "../hooks/useForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values);
  };

  const isFormValid =
    Boolean(values.name?.trim()) &&
    Boolean(values.imageUrl?.trim()) &&
    Boolean(values.weather);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      contentClassName="modal__content-add"
    >
      <label htmlFor="name" className="modal__label modal__text">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          required
          minLength={2}
          maxLength={30}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label modal__text">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
          required
        />
      </label>

      <fieldset
        className="modal__radio-group"
        role="radiogroup"
        aria-label="Select the weather type"
      >
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-row">
          <input
            className="modal__radio"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          <span className="modal__label_text">Hot</span>
        </label>

        <label className="modal__radio-row">
          <input
            className="modal__radio"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <span className="modal__label_text">Warm</span>
        </label>

        <label className="modal__radio-row">
          <input
            className="modal__radio"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span className="modal__label_text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
