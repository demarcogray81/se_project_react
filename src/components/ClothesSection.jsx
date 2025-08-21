import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";
import "../styles/ClothesSection.css";

export default function ClothesSection({
  clothingItems,
  handleAddClick,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser)
    return <p className="cards__text">Please sign in to view your items.</p>;
  const myItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <h3 className="clothes__section-title">Your Items</h3>
        <button className="clothes__section-add-btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>

      {myItems.length === 0 ? (
        <p className="cards__text">You have no items yet.</p>
      ) : (
        <ul className="clothes__section-items">
          {myItems.map((item, index) => (
            <li key={item._id || item.id || index}>
              <ItemCard
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
