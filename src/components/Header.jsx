import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ToggleSwitch from "./ToggleSwitch";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

function Header({ handleAddClick, weatherData, onSignInClick, onSignUpClick }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const initial = currentUser?.name?.charAt(0).toUpperCase() || "?";

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </Link>

      <p className="header__info">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        className="header__add-clothes-btn"
        type="button"
      >
        + Add Clothes
      </button>

      {!currentUser ? (
        <div className="header__auth-buttons">
          <button
            className="header__auth-btn"
            onClick={onSignUpClick}
            type="button"
          >
            Sign Up
          </button>
          <button
            className="header__auth-btn"
            onClick={onSignInClick}
            type="button"
          >
            Log In
          </button>
        </div>
      ) : (
        <Link to="/profile" className="header__link">
          <div className="header__profile">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">{initial}</div>
            )}
            <span className="header__name">{currentUser.name}</span>
          </div>
        </Link>
      )}
    </header>
  );
}

Header.propTypes = {
  handleAddClick: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
};

export default React.memo(Header);
