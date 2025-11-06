// src/api/upload.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000"; // backup ถ้า env หาย

export async function uploadPortfolio(formData, token) {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio`, {
      method: "POST",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined, // ถ้ามี token จะใส่ header ให้
      body: formData, // Browser จะจัด multipart/form-data ให้เอง
    });

    const data = await res.json(); // แปลง response เป็น JSON

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    return data; // { message, data } ที่ฝั่ง backend ส่งกลับมา
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}
