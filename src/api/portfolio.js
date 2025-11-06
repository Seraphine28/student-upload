// src/api/portfolio.js
const BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
export async function getPortfolio(id) {
  const res = await fetch(`http://localhost:3000/api/portfolio/${id}`);
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return await res.json();
}