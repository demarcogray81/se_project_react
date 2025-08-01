import React, { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../styles/ItemCard.css";

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = item.owner === currentUser._id;
  const isLiked = item.likes.includes(currentUser._id);

  return (
    <div className="item-card">
      <img
        src={item.link}
        alt={item.name}
        className="item-card__image"
        onClick={() => onCardClick(item)}
      />

      <div className="item-card__footer">
        <h4 className="item-card__title">{item.name}</h4>
        <button
          className={`item-card__like ${
            isLiked ? "item-card__like_active" : ""
          }`}
          onClick={() => onCardLike(item)}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          ❤️ {item.likes.length}
        </button>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    link: PropTypes.string,
    owner: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};
