import React, { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../contexts/CurrentUserContext";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../styles/Profile.css";

export default function Profile({
  onCardClick,
  onCardLike,
  onSignOut,
  handleAddClick,
  onEditProfile,
  clothingItems,
}) {
  const user = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <SideBar
        currentUser={user}
        onEditProfile={onEditProfile}
        onSignOut={onSignOut}
      />
      <main className="profile__main">
        <div className="profile__header">
          <h3>Your Items</h3>
          <button onClick={handleAddClick} className="profile__btn">
            + Add New
          </button>
        </div>
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          clothingItems={clothingItems}
        />
      </main>
    </div>
  );
}

Profile.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  handleAddClick: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  clothingItems: PropTypes.array.isRequired,
};
