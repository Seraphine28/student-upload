import React from "react";
import "./NormalCard.css";
import { Link } from "react-router-dom";

export default function ProjectCard({
  id,
  title,
  name,
  university,
  year,
  description,
  image,
  category,
  status = "",
  editMode = false,
  isPublic = false,                  // ✅ สถานะเผยแพร่ปัจจุบัน
  onVisibilityChange,               // ✅ ฟังก์ชันเวลาสลับสวิตช์
}) {
  const statusClass = status.toLowerCase().replace(/\s+/g, "");
  const linkPath =
    status === "Draft" ? `/student/edit/${id}` :
    status === "Failed" ? `/student/resubmit/${id}` :
    null;

  return (
    <div className="card normal-card">
      {/* แถวบนของกล่องขาว: ชื่อโปรเจกต์ + badge */}
      <div className="card-top">
        <h3 className="card-title">{title}</h3>
        {status && (
          <span className={`status-badge ${statusClass}`}>{status}</span>
        )}
      </div>

      {/* รูปภาพ */}
      <img
        src={image || "https://via.placeholder.com/600x320?text=Project"}
        alt={title}
        className="card-img"
      />

      {/* เนื้อหา */}
      <div className="card-content">
        <p><strong>Name:</strong> {name || "-"}</p>
        <p><strong>University:</strong> {university || "-"}</p>
        <p><strong>Year:</strong> {year || "-"}</p>
        <p><strong>Category:</strong> {category || "-"}</p>
        <p className="desc"><strong>Description:</strong> {description || "-"}</p>

        {/* ✅ แสดงสวิตช์เฉพาะสถานะ Approved */}
        {status === "Approved" && typeof onVisibilityChange === "function" && (
          <label className="switch-label">
            <span className="private-text">Private</span>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => onVisibilityChange(id, e.target.checked)}
            />
            <span className="slider round" />
            <span className="public-text">Public</span>
          </label>
        )}

        {/* ปุ่มแก้ไข/ลบ (เฉพาะตอน editMode) */}
        {editMode && (
          <div className="edit-buttons">
            {linkPath ? (
              <Link to={linkPath} className="edit-btn" aria-label="Edit">🖊</Link>
            ) : (
              <button className="edit-btn" type="button" aria-label="Edit">🖊</button>
            )}
            <button className="delete-btn" type="button" aria-label="Delete">❌</button>
          </div>
        )}
      </div>
    </div>
  );
}
