const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export function getToken() {
  return localStorage.getItem("jwt");
}

export async function signup({ name, avatar, email, password }) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Signup error: ${res.status}`);
  }
  return res.json();
}

export async function signin({ email, password }) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Signin error: ${res.status}`);
  return data.token;
}

export async function checkToken(token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Token check failed: ${res.status}`);
  return res.json();
}
