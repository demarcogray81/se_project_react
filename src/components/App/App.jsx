import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import { signin, signup, checkToken, getToken } from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { coordinates, APIkey } from "../../utils/constants";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = useCallback(() => {
    setCurrentTemperatureUnit((u) => (u === "F" ? "C" : "F"));
  }, []);

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    setActiveModal("add-garment");
  };

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const token = await signin({ email, password });
      localStorage.setItem("jwt", token);
      const user = await checkToken(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoginOpen(false);
      const items = await getItems();
      setClothingItems(items.reverse());
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.message);
    }
  };

  const handleRegister = async (data) => {
    try {
      await signup(data);
      await handleLogin({ email: data.email, password: data.password });
      setRegisterOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const handleAddSubmit = async (data) => {
    try {
      const item = await addItem(data);
      setClothingItems((prev) => [{ ...item, link: item.imageUrl }, ...prev]);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setClothingItems((prev) => prev.filter((i) => i._id !== id));
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProfile = async ({ name, avatar }) => {
    try {
      const updated = await updateUser({ name, avatar });
      setCurrentUser(updated);
      setEditProfileOpen(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert(err.message);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
  };

  const handleCardLike = async ({ _id: cardId, likes }) => {
    const isLiked = likes.includes(currentUser._id);
    try {
      const updated = isLiked
        ? await removeCardLike(cardId)
        : await addCardLike(cardId);
      setClothingItems((items) =>
        items.map((i) => (i._id === cardId ? updated : i))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    const token = getToken();
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          return getItems();
        })
        .then((items) => setClothingItems(items.reverse()))
        .catch(() => localStorage.removeItem("jwt"));
    } else {
      getItems()
        .then((items) => setClothingItems(items.reverse()))
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setLoginOpen(false);
            setRegisterOpen(true);
          }}
        />
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setRegisterOpen(false);
            setLoginOpen(true);
          }}
        />
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setEditProfileOpen(false)}
          onUpdate={handleEditProfile}
        />

        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onSignInClick={() => setLoginOpen(true)}
              onSignUpClick={() => setRegisterOpen(true)}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={() => setEditProfileOpen(true)}
                    />
                  </PrivateRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeModal}
            onAddItemModalSubmit={handleAddSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeModal}
            onDelete={handleDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default React.memo(App);
