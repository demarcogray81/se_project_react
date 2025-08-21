import React from "react";
import PropTypes from "prop-types";
import "../styles/SideBar.css";

export default function Sidebar({ currentUser, onEditProfile, onSignOut }) {
  const name = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || "/assets/avatar.png";

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={avatar} alt={`${name} avatar`} className="sidebar__avatar" />
        <h2 className="sidebar__username">{name}</h2>
      </div>

      <div className="sidebar__actions">
        <button className="sidebar__btn" onClick={onEditProfile}>
          Change profile data
        </button>
        <button
          className="sidebar__btn sidebar__btn_signout"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onEditProfile: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
