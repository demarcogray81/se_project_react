import { API_BASE_URL } from "../constants";

function getAuthHeaders() {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function checkResponse(res) {
  if (res.ok) return res.json().catch(() => ({}));
  return res
    .json()
    .catch(() => ({}))
    .then((body) => {
      const msg = body.message || `Error: ${res.status}`;
      throw new Error(msg);
    });
}

function request(path, options = {}) {
  return fetch(`${API_BASE_URL}${path}`, options).then(checkResponse);
}

export function getItems() {
  return request(`/items`, {
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
  });
}

export function addItem(data) {
  return request(`/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
}

export function deleteItem(id) {
  return request(`/items/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
}

export function updateUser(data) {
  return request(`/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
}

export function addCardLike(cardId) {
  return request(`/items/${cardId}/likes`, {
    method: "PUT",
    headers: { ...getAuthHeaders() },
  });
}

export function removeCardLike(cardId) {
  return request(`/items/${cardId}/likes`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
}
