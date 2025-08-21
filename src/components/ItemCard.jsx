import React, { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../styles/ItemCard.css";

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const userId = currentUser?._id || null;
  const likes = Array.isArray(item?.likes) ? item.likes : [];
  const isLiked = !!userId && likes.includes(userId);

  const imgSrc = item.imageUrl || item.link || "";
  const title = item.name;

  return (
    <div className="item-card">
      <div className="item-card__header">
        <span className="item-card__title-pill" title={item.name}>
          {item.name}
        </span>

        <button
          type="button"
          className={`item-card__like ${
            isLiked ? "item-card__like_active" : ""
          }`}
          aria-label={isLiked ? "Unlike" : "Like"}
          aria-pressed={isLiked}
          onClick={(e) => {
            e.stopPropagation();
            onCardLike(item);
          }}
          disabled={!currentUser}
          title={!currentUser ? "Log in to like items" : ""}
        >
          <span className="item-card__like-icon" aria-hidden="true" />
        </button>
      </div>

      <div className="item-card__image-wrap" onClick={() => onCardClick(item)}>
        <img
          className="item-card__image"
          src={item.imageUrl || item.link || ""}
          alt={item.name}
          loading="lazy"
        />
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    link: PropTypes.string,
    owner: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};
