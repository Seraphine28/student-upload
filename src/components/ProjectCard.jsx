// src/components/ProjectCard.jsx
///ใหม่
import React from "react";
import "./NormalCard.css"; // ใช้สไตล์พื้นฐานเดิมได้
import { Link } from "react-router-dom";

export default function ProjectCard({
  id,
  title,
  name,
  university,
  year,
  category,
  description,
  image,
}) {
  // การ์ดหน้า Home ไม่ต้องมี status / edit / toggle
  // กดทั้งใบให้ไปหน้า Comment/Detail สาธารณะ
  const detailPath = `/project/${id}/public`;

  return (
    <Link to={detailPath} className="card normal-card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
      <div className="card-top">
        <h3 className="card-title">{title}</h3>
        {/* ไม่แสดง status badge */}
      </div>

      <img
        src={image || "https://via.placeholder.com/600x320?text=Project"}
        alt={title}
        className="card-img"
      />

      <div className="card-content" style={{ paddingBottom: 16 }}>
        <p><strong>Name:</strong> {name || "-"}</p>
        <p><strong>University:</strong> {university || "-"}</p>
        <p><strong>Year:</strong> {year || "-"}</p>
        <p><strong>Category:</strong> {category || "-"}</p>
        <p className="desc" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          <strong>Description:</strong> {description || "-"}
        </p>
      </div>
    </Link>
  );
}
