import React from "react";
import PropTypes from "prop-types";
import "../styles/SideBar.css";

export default function SideBar({ currentUser, onEditProfile, onSignOut }) {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || ""}
        alt={currentUser?.name || "User Avatar"}
      />
      <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      <button className="sidebar__btn" onClick={onEditProfile}>
        Edit Profile
      </button>
      <button className="sidebar__btn sidebar__btn_signout" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
}

SideBar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
