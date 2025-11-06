const BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
export async function getFallPortfolio(id, token) {
  const res = await fetch(`${BASE}/api/portfolio/${id}/fall`, {
    method: "GET",
    headers: {
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch fall portfolio");
  }

  return data; // { id, title, description, files, feedback, ... }
}