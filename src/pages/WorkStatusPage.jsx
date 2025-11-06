// src/pages/WorkStatusPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import NormalCard from "../components/NormalCard"; // default export จาก NormalCard.jsx
import "./StatusPage.css";

function WorkStatusPage({ showControls }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // ข้อมูลทั้งหมดของโปรเจ็กต์
  const projects = [
    { id: "proj_a_001", title: "Project A", description: "AI system for KMUTT.", tags: ["AI", "2023"], status: "Pending" },
    { id: "proj_b_002", title: "Project B", description: "Web dashboard for health data.", tags: ["React", "2024"], status: "Approved" },
    { id: "proj_c_003", title: "Project C", description: "Hospital record system.", tags: ["Database", "Node.js"], status: "Failed" },
    { id: "proj_d_004", title: "Project D", description: "Monitoring system for IoT devices.", tags: ["IoT", "Cloud"], status: "Draft" },
    { id: "proj_e_005", title: "Project E", description: "Project Management Tool.", tags: ["Angular", "Web"], status: "In Process" },
    { id: "proj_f_006", title: "Project F", description: "Financial tracking app.", tags: ["Node", "Web"], status: "Pending" }
  ];

  const [profileData] = useState({
    name: "Rainbow Pinky",
    university: "KMUTT",
    contact: "rainbowpink@kmutt.ac.th",
  });

  const handleInlineSaveAndClose = () => {
    // TODO: save จริง
    setIsEditing(false);
  };

  // ฟิลเตอร์โปรเจ็กต์: ตอนแก้ไขให้เห็นเฉพาะ Draft/Failed
  const filteredProjects = isEditing
    ? projects.filter((p) => p.status === "Draft" || p.status === "Failed")
    : projects;

  return (
    <>
      {/* ปุ่ม Home มุมขวาบน */}
      <button
        type="button"
        onClick={() => navigate("/home")}
        aria-label="Home"
        style={{
          position: "fixed",
          top: 12,
          right: 16,
          background: "transparent",
          border: "none",
          fontSize: 40,
          cursor: "pointer",
          lineHeight: 1,
          zIndex: 1000,
        }}
      >
        🏠
      </button>

      <div className="profile-container">
        {/* Header */}
        <div className="profile-header-wrapper">
          <ProfileHeader
            name={profileData.name}
            university={profileData.university}
            contact={profileData.contact}
            showEdit={isEditing}
            onClickEdit={() => setIsEditing(true)}
            onClickSave={handleInlineSaveAndClose}
            showControls={showControls}
          />
        </div>

        {/* กริดการ์ดสถานะงาน */}
        <main className="status-projects-grid">
          {filteredProjects.map((p) => (
            <NormalCard
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
              tags={p.tags}
              status={p.status}
              // แสดงปุ่มแก้/ส่งใหม่ เฉพาะ Draft/Failed และเมื่อกด Edit แล้ว
              editMode={(p.status === "Draft" || p.status === "Failed") && isEditing}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default WorkStatusPage;
