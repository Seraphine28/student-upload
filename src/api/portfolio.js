// src/api/portfolio.js
const BASE = process.env.REACT_APP_API_BASE;
export async function getPortfolio(id) {
  const res = await fetch(`${BASE}/api/portfolio/${id}`);
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return await res.json();
}