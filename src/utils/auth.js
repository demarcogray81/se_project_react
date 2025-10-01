import { checkResponse } from "./api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wattawear.twilightparadox.com"
    : "http://localhost:3001";

export function getToken() {
  return localStorage.getItem("jwt");
}

export function signup({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export function signin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => data.token);
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
