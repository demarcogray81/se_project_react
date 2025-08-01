import React, { useContext } from "react";
import "../styles/Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PropTypes from "prop-types";
import "../vendor/fonts.css";
import "../styles/App.css";

export default function Main({
  weatherData,
  onCardClick,
  onCardLike,
  clothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit}
        </p>
        <ul className="cards__list">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  weatherData: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  clothingItems: PropTypes.array.isRequired,
};
