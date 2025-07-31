import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({
  clothingItems,
  handleAddClick,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser)
    return <p className="cards__text">Please sign in to view your items.</p>;
  const myItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothes__section">
      <div className="clothes__section-add">
        <p>Your Items</p>
        <button className="clothes__section-add-btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      {myItems.length === 0 ? (
        <p className="cards__text">You have no items yet.</p>
      ) : (
        <ul className="clothes__section-items">
          {myItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      )}
    </div>
  );
}
