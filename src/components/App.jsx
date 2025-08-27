import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { signin, signup, checkToken, getToken } from "../utils/auth";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import { coordinates, APIkey } from "../utils/constants";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import EditProfileModal from "./EditProfileModal";
import PrivateRoute from "./PrivateRoute";

function App() {
  const navigate = useNavigate();
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

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()));
  const [isAuthReady, setIsAuthReady] = useState(false);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [loadingAction, setLoadingAction] = useState(null);

  const handleToggleSwitchChange = useCallback(
    () => setCurrentTemperatureUnit((u) => (u === "F" ? "C" : "F")),
    []
  );

  const handleSubmit = (actionKey, request, { closeOnSuccess = true } = {}) => {
    setLoadingAction(actionKey);
    return Promise.resolve()
      .then(request)
      .then((res) => {
        if (closeOnSuccess) closeModal();
        return res;
      })
      .catch((err) => {
        console.error(err);
        alert(err?.message || "Something went wrong");
      })
      .finally(() => setLoadingAction(null));
  };

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

  const handleAddSubmit = (data) => {
    handleSubmit("add", () =>
      addItem(data).then((item) => {
        if (!item?._id) throw new Error("New item missing _id");

        setClothingItems((prev) => [{ ...item, link: item.imageUrl }, ...prev]);
      })
    );
  };

  const handleDelete = (id) => {
    handleSubmit("delete", () =>
      deleteItem(id).then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== id));
      })
    );
  };

  const handleCardLike = async ({ _id: cardId, likes = [] }) => {
    if (!currentUser) {
      setLoginOpen(true);
      return;
    }
    const isLiked = likes.includes(currentUser._id);
    try {
      const updated = isLiked
        ? await removeCardLike(cardId)
        : await addCardLike(cardId);

      const updatedItem = updated?.data || updated;
      if (!updatedItem?._id) return;

      setClothingItems((items) =>
        items.map((i) => (i._id === cardId ? updatedItem : i))
      );
    } catch (err) {
      console.error(err);
      alert(err?.message || "Unable to update like");
    }
  };

  const afterLoginHydrate = async (token) => {
    const user = await checkToken(token);
    setCurrentUser(user);
    setIsLoggedIn(true);

    const items = await getItems();
    setClothingItems(items.reverse());
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const token = await signin({ email, password });
      localStorage.setItem("jwt", token);
      await afterLoginHydrate(token);
      setLoginOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert(err?.message || "Login failed");
    }
  };

  const handleRegister = async (data) => {
    try {
      await signup(data);
      await handleLogin({ email: data.email, password: data.password });
      setRegisterOpen(false);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Signup failed");
    }
  };

  const handleEditProfile = ({ name, avatar }) => {
    handleSubmit(() =>
      updateUser({ name, avatar }).then((updated) => {
        setCurrentUser(updated);
        setEditProfileOpen(false);
      })
    );
    handleSubmit(
      "edit",
      () =>
        updateUser({ name, avatar }).then((updated) => {
          setCurrentUser(updated);
          setEditProfileOpen(false);
        }),
      { closeOnSuccess: false }
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
    navigate("/");
  };

  const closeModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  useEffect(() => {
    if (!activeModal) return;
    const onEsc = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    const token = getToken();

    (async () => {
      try {
        if (token) {
          await afterLoginHydrate(token);
        } else {
          setClothingItems([]);
        }
      } catch (err) {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
        setClothingItems([]);
      } finally {
        setIsAuthReady(true);
      }
    })();
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
          isLoading={loadingAction === "edit"}
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
                  <PrivateRoute
                    isLoggedIn={isLoggedIn}
                    isAuthReady={isAuthReady}
                  >
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
            isLoading={loadingAction === "add"}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeModal}
            onDelete={handleDelete}
            isLoading={loadingAction === "delete"}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
