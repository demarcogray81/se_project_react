import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes__section-add">
        <p>Your Items</p>
        <button className="clothes__section-add-btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes__section-items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
