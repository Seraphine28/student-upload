// src/api/portfolio.js

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000"; // backup ถ้า env หาย

export async function getPortfolioById(id) {
  const res = await fetch(`${API_BASE}/api/portfolio/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch portfolio");
  return data;
}

export async function reviewAdvisor(id, body) {
  const res = await fetch(`${API_BASE}/api/portfolio/${id}/review`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Review failed");
  return data;
}

export async function reviewSuper(id, body) {
  const res = await fetch(`${API_BASE}/api/portfolio/${id}/super-review`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Super review failed");
  return data;
}


