const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wattawear.twilightparadox.com"
    : "http://localhost:3001";

function getAuthHeaders() {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function checkResponse(res) {
  if (res.ok) return res.json();
  return res
    .json()
    .catch(() => null)
    .then((body) => {
      const msg = body?.message || `Error: ${res.status}`;
      return Promise.reject(new Error(msg));
    });
}

function request(url, options = {}) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
}

export function addItem(data) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
}

export function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
}

export function updateUser(data) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
}

export function addCardLike(cardId) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
  }).then((res) => res.data ?? res);
}

export function removeCardLike(cardId) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  }).then((res) => res.data ?? res);
}
